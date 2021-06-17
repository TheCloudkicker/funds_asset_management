import json
from django.db import models


from main.models.mixins import RecordCreatedMixin




class SupportType(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    name = models.CharField(blank=True, null=True, max_length=250)

    def __str__(self):
        return f'Support Type: {self.name}'



def fund_support_path_handler(instance, filename):

    if instance.supportType:
        supportTypeName = instance.supportType.name
    else:
        supportTypeName = "Test"

    return f"funds/{instance.fundID}/supports/{supportTypeName}/{filename}"


def data_default_value():
    return {
        'headers': [],
        'items': [],
    }


def renderValue(name, balance, include, uuid, description='', overrideValue = ''):

    return {
            'id': name,
            'name': name,
            'description': description,
            'balance': balance,
            'include': include,
            'overrideValue': { 
                    'uuid': uuid, 
                    'current':overrideValue, 
                    'previous': overrideValue, 
                    'unsaved_changes': False, 
                    'isError': False 
                    },
            'editable': False,
        }



class Support(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    fundID = models.IntegerField(blank=False, null=False)
    periodID = models.IntegerField(blank=False, null=False)

    fileName = models.CharField(blank=True, null=True, max_length=250)
    uploadedBy = models.CharField(blank=True, null=True, max_length=250)
    supportType = models.ForeignKey('supports.SupportType', on_delete=models.SET_NULL, blank=True, null=True)
    report = models.ForeignKey('supports.ClientReport', on_delete=models.SET_NULL, blank=True, null=True)
    attachment = models.FileField(upload_to=fund_support_path_handler, null=True, blank=True)

    meta = models.JSONField(blank=True, null=True, default=dict)
    data = models.JSONField(blank=True, null=True, default=data_default_value)
    totals = models.JSONField(blank=True, null=True, default=dict)

    includes = models.JSONField(blank=True, null=True, default=dict)

    def save(self, *args, **kwargs):
        super(Support, self).save(*args, **kwargs) 

    def __str__(self):
        return f'Support: {self.fileName}'


    def get_net_assets(self):

        assets = 0
        liabilities = 0
        items  = self.data['items']

        for item in items:
            if item[0].startswith('1'):
                assets += float(item[5])
            elif item[0].startswith('2'):
                liabilities += float(item[5])

        return assets + liabilities

    def get_investment_data(self, params, invType):

        items = self.data['items']

        activity_types = {
            'contributions': [],
            'capitalized': [],
            'distributions': [],
            'fair_value':[]
        }
                    
        includes_data = params.includes


        for activity_type in activity_types:

            key = f'{invType}_{activity_type}'

            try:

                key_includes = includes_data[key]
                activity_types[activity_type] = key_includes

            except:

                key_includes = []
                for _ in range(len(items)):
                    key_includes.append(1)

                includes_data[key] = key_includes
                params.includes = includes_data
                params.save()
                activity_types[activity_type] = key_includes


        capitalized_balances = []
        contribution_balances = []
        distribution_balances = []
        fair_value_balances = []

        def getBool(_int):
            return _int == 1
        

        index = 0

        # print('activity_types',activity_types)

        for item in items:

            if invType == 'secondary':
                name = item['Investment_Name']
                uuid = item['uuid']

                fair_value_balance = item['Market_Value_Ending_Balance_Base_Curr']
                contribution_balance = item['YTD_Capital_Contributions_Base_Curr']
                distribution_balance = item['YTD_Capital_Distributions_Base_Curr'] * -1
                capitalized_balance = item['Capitalized_Cost-YTD_Base_Curr']

                contribution_balances.append(renderValue(name, contribution_balance, getBool(activity_types['contributions'][index]), uuid=uuid))
                distribution_balances.append(renderValue(name, distribution_balance, getBool(activity_types['capitalized'][index]), uuid=uuid))
                capitalized_balances.append(renderValue(name, capitalized_balance, getBool(activity_types['distributions'][index]), uuid=uuid))
                fair_value_balances.append(renderValue(name, fair_value_balance , getBool(activity_types['fair_value'][index]), uuid=uuid))

                index += 1

        return {
            'fair_value_balances':fair_value_balances,
            'contribution_balances':contribution_balances,
            'distribution_balances':distribution_balances,
            'capitalized_balances':capitalized_balances
        }


    def update_includes(self, key, index, value):

        includes_data = self.includes

        key_includes = includes_data[key]

        if value == True:
            key_includes[index] = 1

        elif value == False:
            key_includes[index] = 0

        self.save()

        return 0


    def get_json_data(self, params=None, overrided_values=None, includes=None, *args, **kwargs):

        items = self.data['items']

        # print('items', len(items))

        if includes is not None and params is not None:
            includes_data = params.includes

            try:
                key_includes = includes_data[includes]

            except:

                meta = self.meta
                no_items = meta['no_items']

                key_includes = []

                for _ in range(no_items):
                    key_includes.append(0)

                includes_data[includes] = key_includes
                params.includes = includes_data
                params.save()

        else:
            key_includes = None


        accounts = []
        total = 0

        i = 0


        
        for item in items:

            uuid = item[6]

            try:
                overrideValue_obj = overrided_values.get(uuid=uuid)
                overrideValue = overrideValue_obj.value
            
            except:
                overrideValue = ''

            if key_includes and key_includes[i] == 1: include = True
            else: include = False
                

            i += 1

            if include:
                total += float(item[5])

            obj = {
                'id': item[0],
                'name': item[0],
                'description': item[1],
                'balance': item[5],
                'include': include,
                'overrideValue': { 'uuid': uuid, 'current':overrideValue, 'previous': overrideValue, 'unsaved_changes': False, 'isError': False },
                'editable': False,
            }

            accounts.append(obj)

        # print('here2', len(accounts))
        return accounts, total
    

    def get_as_of_date(self):

        try:
            meta = json.loads(self.meta)
            dateObject = meta['asOfDate']
            current = dateObject['current']
            day = current['day']
            month = current['month']
            year = current['year']

            asOfDate = f'{day}/{month}/{year}'
            return asOfDate

        except:
            return None


class FundSupport(models.Model):

    fund = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True)
    support = models.ForeignKey('supports.Support', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'{self.fund}:{self.support}'