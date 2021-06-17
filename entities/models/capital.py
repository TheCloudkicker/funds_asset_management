import json
import datetime
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


CAPITAL_TYPES = (
    ('Contribution', 'Contribution'),
    ('Distribution', 'Distribution'),
)


class CapitalMovement(RecordCreatedMixin):

    uuid = models.CharField(blank=True, null=True, max_length=250)
    fund = models.ForeignKey('entities.Fund', on_delete=models.CASCADE, blank=True, null=True)

    movementType = models.CharField(choices=CAPITAL_TYPES, blank=True, null=True, max_length=250)
    addedBy = models.CharField(blank=True, null=True, max_length=100)
    movementDate = models.DateTimeField(blank=True, null=True)
    totalAmount = models.DecimalField(blank=True, null=True, max_digits=20, decimal_places=2)
    dateAdded = models.DateTimeField(blank=True, null=True)

    supportID = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.fund}-{self.movementDate}-{self.movementType}'

    def save_new(self, data, profile, fund_id):

        print("SAVE OBJECT", data, profile)

        self.totalAmount = data['totalAmount']['current']
        self.movementType = data['movementType']['current']
        movementDateDt = datetime.datetime.strptime(data['movementDate']['current'], '%m-%d-%Y')
        self.movementDate = movementDateDt
        self.addedBy = profile
        self.fund_id = fund_id
        self.uuid = data['id']
        self.dateAdded = datetime.datetime.now()

        return 

    def update_object(self, data, profile):

        self.totalAmount = data['totalAmount']['current']
        self.movementType = data['movementType']['current']
        movementDateDt = datetime.datetime.strptime(data['movementDate']['current'], '%m-%d-%Y')
        self.movementDate = movementDateDt
        return

    def get_movemenType(self):

        if self.movementType:
            return { 'value': self.movementType , 'label': self.movementType }
        else: return None

    def has_support(self):

        if self.supportID: return True,
        else: return False
            

    def get_json(self):

        movementDateStr = self.movementDate.strftime('%m-%d-%Y')
        dateAddedStr = self.dateAdded.strftime('%Y-%m-%d')

        return {
            'id': self.id,
            'uuid': self.uuid,
            'readOnly': True,
            'movementType': {
                'previous': self.movementType,
                'current': self.movementType,
                'readOnly': True,
                'options': [
                    { 'value': 'Contribution', 'label': 'Contribution' },
                    { 'value': 'Distribution', 'label': 'Distribution' },
                ],
                'isError': False,
                'unsaved_changes': False
            },
            'totalAmount': {
                'previous': self.totalAmount,
                'current': self.totalAmount,
                'placeholder': 'Enter net movement in USD',
                'readOnly': True,
                'isError': False,
                'unsaved_changes': False
            },
            'movementDate': {
                'previous': movementDateStr,
                'current': movementDateStr,
                'readOnly': True,
                'isError': False,
                'unsaved_changes': False
            },
            'addedBy': self.addedBy,
            'dateAdded': dateAddedStr,
            'preferred': 0,
            'hasSupport': self.has_support(),
        }
            

