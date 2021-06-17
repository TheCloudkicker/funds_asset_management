import json
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


PRE_WAIBE = 2019

def initPreWaibeValue(year, balance):

    return {
        'id': int(year),
        'isOpen': False,
        'year': int(year),
        'total': { 'current':balance, 'previous': balance, 'unsaved_changes': False, 'isError': False, 'readOnly': True, },
        'allocated_total': 0,
        'source': 'Pre Waibe',
        'accounts': [],
        'balances': [],
        'attachments': []
        }




class LegacyData(RecordCreatedMixin):

    fund = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True)
    data = models.JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return f'Legacy {self.fund}'

    def update_data(self, dataType, key, value):

        print('dataType', dataType)

        d = self.data[dataType]

        print('d', d)

        d[key] = value
        

        print('d2', d) 
        self.data[dataType] = d


        self.save()

        return initPreWaibeValue(key, value)
 
    def get_json_obj(self, dataType, key):

        


        return


    def set_data(self, dataType, dataObject):

        data = self.data

        try:
            _data = data[dataType]
        except:
            data[dataType] = {}
            _data = data[dataType]

        _data[dataObject['year']] = dataObject['total']['current']

        self.save()
        
        return


    def get_data(self, dataType):

        data = self.data
        new = False

        arr = []
        commencement_date = self.fund.commencement_date

        if commencement_date == None: return arr 
        commencement_year = commencement_date.year


        try: 
            _data = data[dataType]
        except:
            _data = {}
            data[dataType] = _data
            self.data = data
            self.save()
            new = True

        for _year in range(PRE_WAIBE - commencement_year):

                year = _year +  commencement_year

                try:
                    year_str = str(year)
                    balance = _data[year_str]
                except:
                    balance = 0

                arr.append(initPreWaibeValue(year, balance))


        return arr







