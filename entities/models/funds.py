from django.db import models
from django.apps import apps
from django.db.models import Sum
import json
import datetime

from main.models.mixins import RecordCreatedMixin
from entities.functions.ownership_nodes import generate_applicable_entities, generate_ownership_tree
from entities.functions.structure import generate_navigator_structure
from entities.functions.materiality import generate_materiality



def jsonfield_default_value():

    legacy_data = {
        'investment_years': {},
        'capital_movements': [],
        'allocation_years': {},
        'derivative_years': {}
    }
    return legacy_data


ENTITY_TYPES = (
    ("Corporation", "Corporation"),
    ("Partnership (LP)", "Partnership (LP)"),
    ("Limited Liability Company (LLC)", "Limited Liability Company (LLC)"),
    ("Limited Liability Partnership (LLP)", "Limited Liability Partnership (LLP)"),
    ("Limited (Ltd)","Limited (Ltd)"),
    ("SCSp", "SCSp"),
    ("GmbH","GmBH"),
)
ENTITY_TYPES_JSON = [
    { 'value': 'Corporation', 'label':'Corporation'  },
    { 'value': 'Partnership (LP)', 'label':'Partnership (LP)'  },
    { 'value': 'Limited Liability Company (LLC)', 'label':'Limited Liability Company (LLC)'  },
    { 'value': 'Limited Liability Partnership (LLP)', 'label':'Limited Liability Partnership (LLP)'  },
    { 'value': 'Limited (Ltd)', 'label':'Limited (Ltd)'  },
    { 'value': 'SCSp', 'label':'SCSp'  },
    { 'value': 'GmbH', 'label':'GmbH'  },
]
DOMICILE_LOCATIONS = (
    ("Delaware", "Delaware"),
    ("Scotland", "Scotland"),
    ("Luxembourg", "Luxembourg"),
    ("Delaware", "Delaware"),
    ("Mauritius", "Mauritius"),
)
DOMICILE_LOCATIONS_JSON = (
    { 'value': 'Delaware' , 'label': 'Delaware' },
    { 'value': 'Scotland' , 'label': 'Scotland' },
    { 'value': 'Luxembourg' , 'label': 'Luxembourg' },
    { 'value': 'Mauritius' , 'label': 'Mauritius' },
)
ACCT_SYSTEMS = (
    ("Investran", "Investran"),
    ("InvestAI", "InvestAI"),
)

ACCT_SYSTEMS_JSON = [
    { 'value': 'Investran', 'label': 'Investran' },
    { 'value': 'InvestAI', 'label': 'InvestAI' },
]

def initPostWaibeValue(year, balance, allocated_balance = None, accounts=[], attachments=[], source='Trial Balance'):

    return {
            'id': year,
            'isOpen': False,
            'year': year,
            'total': { 'current':balance, 'previous': balance, 'unsaved_changes': False, 'isError': False, 'readOnly': True, },
            'allocated_total': { 'current': allocated_balance, 'previous': allocated_balance, 'unsaved_changes': False, 'isError': False },
            'source': source,
            'accounts': accounts,
            'attachments': attachments
        }

def initObj(val):

    return { 
        'current':val, 
        'previous': val, 
        'unsaved_changes': False, 
        'isError': False, 
        'readOnly': False 
        }
def initTotal(total):


    return { 
        'current':total, 
        'previous': total, 
        'unsaved_changes': False, 
        'isError': False, 
        'readOnly': True 
        }
    


def totalYears(years):

    totalAllYears = 0

    for year in years:
        totalAllYears += year['total']['current']


    return totalAllYears

class Fund(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    trackingID = models.CharField(blank=True, null=True, max_length=250)
    legal_name = models.CharField(blank=True, null=True, max_length=250)
    short_name = models.CharField(blank=True, null=True, max_length=100)
    isAudited = models.BooleanField(default=False)

    general_partner = models.ForeignKey('entities.Investor', on_delete=models.SET_NULL, blank=True, null=True, related_name="general_partner") 
    carry_partner = models.ForeignKey('entities.Investor', on_delete=models.SET_NULL, blank=True, null=True, related_name="carry_partner") 
    domicile_location = models.CharField(max_length=50, blank=True, null=True, choices=DOMICILE_LOCATIONS)
    entity_type = models.CharField(max_length=50, blank=True, null=True, choices=ENTITY_TYPES)
    acct_system = models.CharField(max_length=50, blank=True, null=True, choices=ACCT_SYSTEMS)
    commencement_date = models.DateField(blank=True, null=True)
    fund_life = models.DecimalField(blank=True, null=True, max_digits=6, decimal_places=2)
    administrator = models.ForeignKey('main.Administrator', on_delete=models.CASCADE, blank=True, null=True)
    depository = models.ForeignKey('main.Depository', on_delete=models.CASCADE, blank=True, null=True)
    investment_manager = models.ForeignKey('main.InvestmentManager', on_delete=models.CASCADE, blank=True, null=True, related_name="investment_manager")
    sub_advisor = models.ForeignKey('main.InvestmentManager', on_delete=models.CASCADE, blank=True, null=True, related_name="sub_advisor")

    data = models.JSONField(blank=True, null=True)
    legacy_data = models.JSONField(blank=True, null=True, default=jsonfield_default_value)
    legal_type = models.IntegerField(blank=True, null=True)
    domicile_countryID = models.IntegerField(blank=True, null=True)

    prefRate = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
   
    def __str__(self):
        return f"{self.legal_name} - {self.trackingID}"

    def get_prefRate(self):

        if self.prefRate:
            return self.prefRate
        else: return 0

    def get_net_assets(self, period):

        Support = apps.get_model('supports', 'Support')

        try:
            tb = Support.objects.filter(fundsupport__fund=self, periodID=period.id, report__name='Trial Balance')[0]

            net_assets = tb.get_net_assets()

            return net_assets

        except:
            return 0


    def set_fund_criteria(self, key, value):
        print('UPdating', )
        return

    def get_fund_criteria(self, key, value):
        return

    def get_client_value(self, period, area, *args, **kwargs):

        ClientValue = apps.get_model('fs', 'ClientValue')
        client_value, _ = ClientValue.objects.get_or_create(fund=self, period=period)
        value = client_value.get_json('carry')
        return value

    def get_materiality(self, period, *args, **kwargs):
        return generate_materiality(self, period)

    def get_ownership_tree(self, period, *args, **kwags):
        return generate_ownership_tree(self, period)

    def get_tb_accounts(self, period, *args, **kwargs):

        Support = apps.get_model('supports', 'Support')

        try:
            tb = Support.objects.filter(fundsupport__fund=self, periodID=period.id, report__name='Trial Balance')[0]
        except: return []

        accounts, total = tb.get_json_data()
        return accounts

    def get_investors(self, *args, **kwargs):

        InvestorCommit = apps.get_model('entities', 'InvestorCommit')

        investors = []
        investor_commits_qs = InvestorCommit.objects.filter(fund=self).order_by('investor__name')

        for investor_commit in investor_commits_qs:

            if investor_commit.isAffiliate:
                isAffiliate = "Yes"
            else:
                isAffiliate = "No"

            investors.append({
                'id': investor_commit.investor.id,
                'name':  initObj(investor_commit.investor.name),
                'commitment': initObj(investor_commit.commitment_base),
                'isAffiliate': initObj(isAffiliate),
                'criteria': []
            })


        return investors

    def get_lp_ownership(self, period, *args, **kwargs):

        InvestorCommit = apps.get_model('entities', 'InvestorCommit')
        investorsCommitments = InvestorCommit.objects.filter(fund=self)

        total_commitments = investorsCommitments.aggregate(Sum('commitment_base'))['commitment_base__sum']
        if not total_commitments: total_commitments = 1

        unaff_commitments = investorsCommitments.filter(isAffiliate=False).aggregate(Sum('commitment_base'))['commitment_base__sum']
        if not unaff_commitments: unaff_commitments = 1

        percent = (unaff_commitments / total_commitments) * 100
        return { 'total_commitments': total_commitments, 'unaff_commitments': unaff_commitments, 'percent': percent }

    def get_carry_rate(self):
        return 15

    def get_entity_type(self):
        entity_type = self.entity_type
        if entity_type:
            return { 'value': entity_type, 'label': entity_type}
        else: return None
            

    def get_legacy_data(self, dataType):
        LegacyData = apps.get_model('entities', 'LegacyData')
        legacydata, _ = LegacyData.objects.get_or_create(fund=self)
        return legacydata.get_data(dataType)

    def get_master_years(self, period, overrided_values, params, *args, **kwargs):

        # Fund = apps.get_model('entities', 'Fund')
        # master = Fund.objects.get(pk=56)
        Support = apps.get_model('supports', 'Support')
        years = [2019,]

        try:
            tb = Support.objects.filter(fundsupport__fund=self, periodID=period.id, report__name='Trial Balance')[0]
            # accounts, total = tb.get_json_data(params, overrided_values, includes='master')
        except:
            tb = None

        total = 0
        allocated_total = 0
        accounts = []
        ownership_perc = 37.2

        if tb:
            includes_data = params.includes

            try:
                key_includes = includes_data['master']

            except:
                print("MASTER")
                meta = tb.meta
                no_items = meta['no_items']

                key_includes = []

                for _ in range(no_items):
                    key_includes.append(0)

                includes_data['master'] = key_includes
                params.includes = includes_data
                params.save()

            items = tb.data['items']

            i = 0
            for item in items:
                
                uuid = item[6]

                try:
                    overrideValue_obj = overrided_values.get(uuid=uuid)
                    overrideValue = overrideValue_obj.value
                
                except:
                    overrideValue = ''

                if key_includes[i] == 1:
                    include = True
                else:
                    include = False

                if include:
                    total += float(item[5])
                    allocated_total = total * float(ownership_perc / 100)

                i += 1

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

        master_years = self.get_legacy_data('master')


        for year in years:
            master_years.append(initPostWaibeValue(year, total, allocated_total, accounts))

        master_total = 0

        for year in master_years:
            master_total += year['total']['current'] * float(ownership_perc / 100)
            year['allocated_total'] = year['total']['current'] * float(ownership_perc / 100)

        return { 'ownership_perc': ownership_perc, 'years': master_years }

    def get_attachments(self):

        attachments = [
            { 'id': 1, 'name': 'File 1', 'url': 'file url', 'editable': False, 'amount': 100, 'dateUploaded': '1/1/2020', 'uploadedBy': 'Batman' },
            { 'id': 1, 'name': 'File 1', 'url': 'file url', 'editable': False, 'amount': 100, 'dateUploaded': '2/1/2020', 'uploadedBy': 'Batman' },
            { 'id': 1, 'name': 'File 1', 'url': 'file url', 'editable': False, 'amount': 100, 'dateUploaded': '3/1/2020', 'uploadedBy': 'Batman' },
        ]

        return attachments


    def get_other_income_years(self, period, *args, **kwarfs):

        years = [2019,]

        attachments = self.get_attachments()

        year_total = 0

        for attachment in attachments:
            year_total += attachment['amount']

        other_income_years = self.get_legacy_data('other_income')

        for year in years:
            other_income_years.append(initPostWaibeValue(year, year_total, attachments=attachments, source='Attachment'))

        return other_income_years


    def get_carry_years(self, period, *args, **kwargs):
        carry_years = self.get_legacy_data('htd_carry')
        return carry_years


    def get_derivative_years(self, period, overrided_values, params, *args, **kwargs):

        Support = apps.get_model('supports', 'Support')
        years = [2019,]
        

        try:
            tb = Support.objects.filter(fundsupport__fund=self, periodID=period.id, report__name='Trial Balance')[0]
            accounts, total = tb.get_json_data(params, overrided_values, includes='derivatives')
        except:
            tb = None
            total = 0
            accounts = []

        derivative_years = self.get_legacy_data('derivatives')

        for year in years:
            derivative_years.append(initPostWaibeValue(year, total, accounts=accounts))

        deriv_total = 0

        for year in derivative_years:
            deriv_total += year['total']['current']

        return derivative_years


    def current_blockers(self, period, key, overrided_values, params):

        
        Support = apps.get_model('supports', 'Support')
        ownership_tree = self.get_ownership_tree(period)


        def flatten_blocker_tree(tree):

            def get_children(entity):

                _children = []

                if entity['unconsolidated_entities']:
                    for _entity in entity['unconsolidated_entities']:
                        _children.append(_entity)
                        _children.extend(get_children(_entity))

                return  _children


            return get_children(ownership_tree)



        blockers_flat = flatten_blocker_tree(ownership_tree)

        ids = []

        for blocker in blockers_flat:
            ids.append(blocker['value'])

        blockers_flat_sorted = sorted(blockers_flat, key=lambda k: k['label']) 
        blockers = []
        tbs = Support.objects.filter(fundsupport__fund_id__in=ids, periodID=period.id, report__name='Trial Balance')

        for blocker in blockers_flat_sorted:

            try: 
                tb = tbs.filter(fundsupport__fund_id=blocker['value'])[0]
                blockerID = blocker['value']
                includes = f'blocker_{blockerID}'
                accounts, blockerTotal = tb.get_json_data(params, overrided_values, includes=includes)
    # 
                years = [
                    { 'value': 2019, 'label': 2019, 'year': 2019, 'accounts':accounts, 'attachments': [], 'source': 'Trial Balance', 'total':initTotal(blockerTotal)  },
                ]

                blockers.append({
                    'id':blocker['value'],
                    'value': blocker['value'], 
                    'label': blocker['label'],
                    'gross_percent': blocker['gross_percent'],
                    'years': years, 
                    'isOpen': False, 
                    'total':initTotal(blockerTotal)
                })
            
            
            except:
                years = [
                    { 'value': 2019, 'label': 2019, 'year': 2019, 'accounts':[], 'attachments': [], 'source': 'Trial Balance', 'total':initTotal(0)  },
                ]
                blockers.append({
                    'id':blocker['value'],
                    'value': blocker['value'], 
                    'label': blocker['label'],
                    'gross_percent': blocker['gross_percent'],
                    'years': [], 
                    'isOpen': False, 
                    'total':initTotal(0)
                })


        
        return blockers



    def get_master_ownership(self):

        return 25

    def get_support_detail(self, key, year, overrided_values, params):

        supportDetails = { 'total': 0, 'allocation_percentage': None }

        if key == 'derivatives':
            supportDetails['years'] = self.get_derivative_years(year, overrided_values, params)
            supportDetails['total'] = totalYears(supportDetails['years'])

        elif key == 'master':
            masterDetails = self.get_master_years(year, overrided_values, params)
            supportDetails['years'] = masterDetails['years']
            supportDetails['total'] = totalYears(supportDetails['years'])
            supportDetails['allocation_percentage'] = self.get_master_ownership()

        elif key == 'other_income':
            supportDetails['years'] = self.get_other_income_years(year, overrided_values, params)
            supportDetails['total'] = totalYears(supportDetails['years'])
            
        elif key == 'htd_carry':
            supportDetails['years'] =  self.get_carry_years(year, overrided_values, params)
            supportDetails['total'] = totalYears(supportDetails['years'])

        elif key == 'primary' or key == 'secondary' or key == 'direct':
            actObject = self.get_investment_activity(year, key, overrided_values, params)
            supportDetails['activity_types'] =  actObject['activity_types']
            supportDetails['total'] =  actObject['total']

        elif key == 'blockers':
            supportDetails['legacy_years'] = self.get_legacy_data('blockers')
            supportDetails['current_blockers'] = self.current_blockers(year, key, overrided_values, params)
            supportDetails['byBlocker'] = True
            supportDetails['total'] = totalYears(supportDetails['legacy_years'])

        else:
            pass

        return supportDetails


    def get_investment_activity(self, period, key, overrided_values, params):

        def initTotal(bal):

            return { 
                'current':bal,      
                'previous': bal, 
                'unsaved_changes': False, 
                'isError': False, 
                'readOnly': True, 
                }

        def totalBalances(arr):

            tot = 0

            for item in arr:
                tot += item['balance'] 

            return { 
                'current': tot, 
                'previous': tot, 
                'unsaved_changes': False, 
                'isError': False, 
                'readOnly': True, 
                }

        Support = apps.get_model('supports', 'Support')

        try:
            hld = Support.objects.filter(fundsupport__fund=self, periodID=period.id, report__name='Holdings Report')[0]
        except: 
            hld = None
            # return { 'activity_types': [], 'total': 0 } 
        
        if hld:
            investmentObject = hld.get_investment_data(params, key)
            fair_value_balances = investmentObject['fair_value_balances']
            contribution_balances = investmentObject['contribution_balances']
            distribution_balances = investmentObject['distribution_balances']
            capitalized_balances = investmentObject['capitalized_balances']
        else:
            fair_value_balances = []
            contribution_balances = []
            distribution_balances = []
            capitalized_balances = []

        cont_years = self.get_legacy_data(f'{key}_contributions')
        cont_years.append({
                'value': 2019, 
                'label': 2019, 
                'year': 2019, 
                'accounts': contribution_balances, 
                'attachments': [], 
                'source': 'Holdings Report', 
                'total': totalBalances(contribution_balances)  
        })
        cont_years_total = totalYears(cont_years)
        
        cap_years = self.get_legacy_data(f'{key}_capitalized')
        cap_years.append({
                'value': 2019, 
                'label': 2019, 
                'year': 2019, 
                'accounts': capitalized_balances, 
                'attachments': [], 
                'source': 'Holdings Report', 
                'total':totalBalances(capitalized_balances)   
        })
        cap_years_total = totalYears(cap_years)

        dist_years = self.get_legacy_data(f'{key}_distributions')

        dist_years.append({
                'value': 2019, 
                'label': 2019, 
                'year': 2019, 
                'accounts':distribution_balances, 
                'attachments': [], 
                'source': 'Holdings Report', 
                'total':totalBalances(distribution_balances)     
        })
        dist_years_total = totalYears(dist_years)

        fvyears = [
            { 
                'value': 2019, 
                'label': 2019, 
                'year': 2019, 
                'accounts':fair_value_balances, 
                'attachments': [], 
                'source': 'Holdings Report', 
                'total':totalBalances(fair_value_balances)     
            },
        ]

        fvyears_total = totalYears(fvyears)


        activity_types = [
            { 'value': 'contributions' ,'label': 'Contributions', 'years': cont_years, 'total': initTotal(cont_years_total) },
            { 'value': 'capitalized' ,'label': 'Capitalized', 'years': cap_years, 'total': initTotal(cap_years_total) },
            { 'value': 'distributions' ,'label': 'Distributions', 'years': dist_years, 'total': initTotal(dist_years_total) },
            { 'value': 'fair_value' ,'label': 'Fair Value', 'years': fvyears, 'total': initTotal(fvyears_total) },
        ]

        total = fvyears_total - cont_years_total - cap_years_total - dist_years_total

        return { 'activity_types': activity_types, 'total': total } 

    def get_fslis(self, period):

        Fsli = apps.get_model('fs', 'Fsli')

        fslis = Fsli.objects.filter(
            genericmapping__account__balance__fundID=self.id,
            genericmapping__account__balance__periodID=period.id,
        ).distinct()
        
        return fslis


    def get_navigator_structure(self, period, *args, **kwags):
        return generate_navigator_structure(self, period)

    def get_applicable_entities(self, period, fundType, *args, **kwags):
        return generate_applicable_entities(self, period, fundType)


    def get_legacy_data2(self):
            

            legacy_data = self.legacy_data
            capital_movements = []
   
            for capital_movement in legacy_data['capital_movements']:

                obj = {
                    'id':capital_movement['id'],
                    'editable': False,
                    'isNew': False,
                    'status': 'N/A',
                    'date': {
                        'current':capital_movement['date'],
                        'previous':capital_movement['date'],
                        'unsaved_changes':False,
                        'isError': False,
                    },
                    'baseAmount': {
                        'current':capital_movement['baseAmount'],
                        'previous':capital_movement['baseAmount'],
                        'unsaved_changes':False,
                        'isError': False,
                    },
                    'type': {
                        'current': capital_movement['type'],
                        'previous': capital_movement['type'],
                        'unsaved_changes':False,
                        'isError': False,
                    },
                    'source': capital_movement['source']

                }
                capital_movements.append(obj)

            response = {
                'capital_movements': capital_movements,
            }

            return response


    def generate_tb(self, period):

        """
        METHOD AGGREGATES ALL ENTRIES FOR THE YEAR
        AND ADDS ANY GENERIC OR CUSTOM FSLI MAPPINGS
        """

        Entry = apps.get_model('entries', 'Entry')
        GenericMapping = apps.get_model('fs', 'GenericMapping')
        CustomMapping = apps.get_model('fs', 'CustomMapping')


        generics = list(GenericMapping.objects.filter(clientID=self.clientID).values('id','fsli_id','account_id'))
        customs = list(CustomMapping.objects.filter(clientID=self.clientID, fundID=self.id).values('id','fsli_id','account_id'))
        entries = Entry.objects.filter(fund=self)

        debit_sums = entries.filter(debit_credit="DEBIT").values('sub_account_id','sub_account__description','sub_account__number').annotate(Sum('amount'))
        credit_sums = entries.filter(debit_credit="CREDIT").values('sub_account_id','sub_account__description','sub_account__number').annotate(Sum('amount'))
            
        tb = { 'mapped': [], 'unmapped': [] }

        for debit_sum in debit_sums:
            
            found = False

            for custom in customs:

                if debit_sum['sub_account_id'] == custom['account_id']:

                    try: debit_sum['fsliID'] = custom['fsli_id']
                    except: debit_sum['fsliID'] = custom['fsli_id']

                    found = True
                    break

            if not found:

                for generic in generics:

                    if debit_sum['sub_account_id'] == generic['account_id']:

                        try: debit_sum['fsliID'] = generic['fsli_id']
                        except: debit_sum['fsliID'] = generic['fsli_id']

                        found = True
                        break

            if found: tb['mapped'].append(debit_sum)
            else: tb['unmapped'].append(debit_sum)

        return tb


    def generate_fs(self, period):

        Fsli = apps.get_model('fs', 'Fsli')

        fslis_qs = Fsli.objects.all()

        fs = []

        statements = [
                {
                    "name":"Balance Sheet",
                    "fsli_types": ["Asset", "Liability", "Equity"]
                },
                {
                    "name":"Income Statement",
                    "fsli_types":["Income", "Expense"]
                },
                {
                    "name":"Statement of Equity",
                    "fsli_types": ["Equity",]
                }
            ]

        tb = self.generate_tb(period)
        mapped_accts = tb['mapped']

        for statement in statements:

            statement_dict = {
                "statement_name": statement["name"],
                "fsli_types": []
            }

            fsli_types = []
            
            for fsli_type in statement['fsli_types']:

                fsli_type_dict = {
                    "fsli_type_name": fsli_type,
                    "fslis": []
                }

                fslis = fslis_qs.filter(fsli_type=fsli_type)

                fslis_list = []

                for fsli in fslis:

                    balances = []

                    for mapped_acct in mapped_accts:

                        obj = {
                            'id': mapped_acct['sub_account_id'],
                            'name': mapped_acct['sub_account__description'],
                            'no': mapped_acct['sub_account__number'],
                            'balance': float(mapped_acct['amount__sum']),
                        }

                        balances.append(obj)

                    if len(balances) == 0:
                        continue
                    else:
                        fsli_dict = {
                            'id': fsli.id,
                            'fsli_name': fsli.name,
                            'balances': balances
                        }

                        fslis_list.append(fsli_dict)

                fsli_type_dict["fslis"] = fslis_list

                fsli_types.append(fsli_type_dict)

                statement_dict["fsli_types"] = fsli_types

            fs.append(statement_dict)

        fs_object = {
            'fs': fs,
            'unmapped': tb['unmapped']
        }
        
        return fs_object

    def get_general_partner(self, investors):
        try:
            general_partner = investors.get(id=self.general_partner_id)
            return general_partner

        except: return None

    def get_carry_partner(self, investors):
        try:
            general_partner = investors.get(id=self.carry_partner_id)
            return general_partner

        except: return None
            

    def get_commencement_date(self):
        if self.commencement_date:
            return self.commencement_date.strftime('%m-%d-%Y')
        else: return None
            

    def set_commencement_date(self, dateString):
        commencement_date = datetime.datetime.strptime(dateString, '%m-%d-%Y')
        self.commencement_date = commencement_date
        return

        
    def get_acct_system(self):
        acct_system = self.acct_system
        if acct_system: return { 'value':acct_system , 'label': acct_system }
        else: return None

    def get_domicile_location(self):
        domicile_location = self.domicile_location
        if domicile_location: return { 'value':domicile_location , 'label': domicile_location }
        else: return None

    def get_administrator(self):
        if self.administrator:
            return { 'value':self.administrator_id , 'label': self.administrator.name }
        else: return None

    def get_depository(self):
        if self.depository:
            return { 'value':self.depository_id , 'label': self.depository.name }
        else: return None

    def get_investment_manager(self):
        investment_manager = self.investment_manager
        if investment_manager: return { 'value':self.investment_manager_id , 'label': investment_manager.name }
        else: return None

    def get_sub_advisor(self):
        sub_advisor = self.sub_advisor
        if sub_advisor: return { 'value':self.sub_advisor_id , 'label': sub_advisor.name }
        else: return None

    def get_is_audited(self):
        if self.isAudited:
            return { 'value': True, 'label': "Yes" }
        else:
            return { 'value': False, 'label': "No" }


    def get_details(self, criteriaType):

        from entities.serializers import InvestorSerializer
        from main.serializers import AdministratorSerializer, DepositorySerializer, InvestmentManagerSerializer

        FundCriteriaDef = apps.get_model('entities', 'FundCriteriaDef')
        Investor = apps.get_model('entities', 'Investor')

        Administrator = apps.get_model('main', 'Administrator')
        Depository = apps.get_model('main', 'Depository')
        InvestmentManager = apps.get_model('main', 'InvestmentManager')

        additional_criterias = FundCriteriaDef.objects.filter(criteriaType=criteriaType)
        investors = Investor.objects.all()

        administrators = Administrator.objects.all()
        depositories = Depository.objects.all()
        investment_managers = InvestmentManager.objects.all()


        carry_partner =  self.get_carry_partner(investors)
        if carry_partner: carry_partner = InvestorSerializer(carry_partner, many=False).data
        general_partner = self.get_general_partner(investors)
        if general_partner: general_partner = InvestorSerializer(general_partner, many=False).data

        details = [
                    {
                        'text': 'Entity Legal Name',
                        'key': 'legal_name',
                        'isRequired': True,
                        'readOnly':True,
                        'current': self.legal_name,
                        'previous': self.legal_name,
                        'valueType': 'text',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'input',
                        'placeholder': 'Enter Legal Name',
                    },
                    {
                        'text': 'Unique Tracking ID',
                        'key': 'trackingID',
                        'isRequired': True,
                        'readOnly':True,
                        'current': self.trackingID,
                        'previous': self.trackingID,
                        'valueType': 'text',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'input',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Is Audited (Issues FS)',
                        'key': 'isAudited',
                        'isRequired': True,
                        'readOnly':True,
                        'current': self.get_is_audited(),
                        'previous': self.get_is_audited(),
                        'valueType': 'bool',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [
                            { 'value': True, 'label': "Yes" },
                            { 'value': False, 'label': "No" },
                        ],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'bool',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'General Partner',
                        'key': 'general_partner_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': general_partner,
                        'previous': general_partner,
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': InvestorSerializer(investors, many=True).data,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Carry Partner',
                        'key': 'carry_partner_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': carry_partner,
                        'previous': carry_partner,
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': InvestorSerializer(investors, many=True).data,
                        'isDisabled': False,
                        'isMulti': True,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Depository',
                        'key': 'depository_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_depository(),
                        'previous': self.get_depository(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': DepositorySerializer(depositories, many=True).data,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Administrator',
                        'key': 'administrator_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_administrator(),
                        'previous': self.get_administrator(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': AdministratorSerializer(administrators, many=True).data,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Accounting System',
                        'key': 'acct_system',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_acct_system(),
                        'previous': self.get_acct_system(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': ACCT_SYSTEMS_JSON,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Domicile Location',
                        'key': 'domicile_location',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_domicile_location(),
                        'previous': self.get_domicile_location(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': DOMICILE_LOCATIONS_JSON,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Entity Type',
                        'key': 'entity_type',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_entity_type(),
                        'previous': self.get_entity_type(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': ENTITY_TYPES_JSON,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Commencement Date',
                        'key': 'commencement_date',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_commencement_date(),
                        'previous': self.get_commencement_date(),
                        'valueType': 'date',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'date',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Fund Life (Years)',
                        'key': 'fund_life',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.fund_life,
                        'previous': self.fund_life,
                        'valueType': 'years',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'input',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Preferred Return Rate',
                        'key': 'prefRate',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_prefRate(),
                        'previous': self.get_prefRate(),
                        'valueType': 'percent',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': [],
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'input',
                        'placeholder': 'Enter value',
                    },
                    {
                        'text': 'Advisor',
                        'key': 'investment_manager_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_investment_manager(),
                        'previous': self.get_investment_manager(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': InvestmentManagerSerializer(investment_managers, many=True).data,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    },
                    {
                        'text': 'Sub Advisor',
                        'key': 'sub_advisor_id',
                        'isRequired': False,
                        'readOnly':True,
                        'current': self.get_sub_advisor(),
                        'previous': self.get_sub_advisor(),
                        'valueType': 'fk',
                        'unsaved_changes': False,
                        'isError': False,
                        'options': InvestmentManagerSerializer(investment_managers, many=True).data,
                        'isDisabled': False,
                        'isMulti': False,
                        'formType': 'select',
                        'placeholder': 'Enter Unique ID',
                    }
                ]

        
        for criteria in additional_criterias:

            obj = {
                'text': criteria.text,
                'key': criteria.key,
                'isRequired': criteria.isRequired,
                'readOnly':True,
                'current': '',
                'previous': '',
                'unsaved_changes': False,
                'isError': False,
                'options': [],
                'isDisabled': False,
                'isMulti': False,
                'formType': criteria.formType,
                'placeholder': criteria.placeholder,
            }

            details.append(obj)

        return details


    def get_capital_movements(self):
        CapitalMovement = apps.get_model('entities', 'CapitalMovement')
        
        capital_movements = CapitalMovement.objects.filter(fund=self).order_by('movementDate')
        movements = []
        for capital_movement in capital_movements:
            movements.append(capital_movement.get_json())

        return movements


class FundAltName(models.Model):

    fund = models.ForeignKey('entities.Fund', on_delete=models.CASCADE, blank=False, null=False) 
    name = models.CharField(blank=True, null=True, max_length=250)

    created_uuid = models.CharField(blank=True, null=True, max_length=250)
    created_userName = models.CharField(blank=True, null=True, max_length=250)
    created_dt = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    sourceID = models.CharField(blank=True, null=True, max_length=100)


    def __str__(self):
        return f"<FundAltName {self.name}>"


class FundCriterionHeader(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=250, blank=True, null=True)
    required = models.BooleanField(default=False)
    order = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"FundCriterionHeader: {self.name}"








