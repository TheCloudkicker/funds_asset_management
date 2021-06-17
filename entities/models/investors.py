import json
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


def initObj(val):

    return { 
        'current':val, 
        'previous': val, 
        'unsaved_changes': False, 
        'isError': False, 
        'readOnly': True 
        }
    


class Investor(RecordCreatedMixin):

    uuid = models.CharField(blank=True, null=True, max_length=250)
    name = models.CharField(max_length=250, blank=True, null=True)
    account_number = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'




    def get_criterias(self, fund):

        print('get criteria', fund)


        return []


PARTNER_TYPES = (
    ( 'LP','LP' ),
    ( 'GP','GP' ),
    ( 'CIP','CIP' ),
)

class InvestorCommit(RecordCreatedMixin):

    investor = models.ForeignKey('entities.Investor', blank=False, null=False, on_delete=models.CASCADE)
    fund = models.ForeignKey('entities.Fund', blank=True, null=True, on_delete=models.SET_NULL)

    ccy = models.CharField(max_length=25, blank=True, null=True)
    commitment_base = models.DecimalField(blank=True, null=True, max_digits=20, decimal_places=2)
    commitment_local = models.DecimalField(blank=True, null=True, max_digits=20, decimal_places=2)
    isAffiliate = models.BooleanField(default=False)

    date_of_close = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.investor} => {self.fund}'

    def update_value(self, key, value):

        if key == 'isAffiliate':
            if value == 'Yes':
                self.isAffiliate = True
            else:
                self.isAffiliate = False

        self.save()


        return 0

    def get_json(self, key, value):

        return



FORM_TYPES = (
    ('input', 'input'),
    ('select', 'select'),
    ('bool', 'bool'),
    ('date', 'date'),
)


