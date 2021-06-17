from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin

from supports.models.waibeFields import CAPITAL_REPORT_FIELDS, TRIAL_BALANCE_FIELDS, HOLDINGS_REPORT_FIELDS

def jsonfield_default_value():

    return {
        'fundString': '',
        'headerId': None
    }

def identifier_default():
    return {
        'isFileName': False,
        'nameString': '',
        'header': None,
    }




class ClientReport(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=250, blank=True, null=True)
    repoType = models.ForeignKey('supports.RepositoryType', on_delete=models.SET_NULL, blank=True, null=True)

    trackingInfo = models.JSONField(blank=True, null=True, default=jsonfield_default_value)

    fundIdentifier = models.JSONField(blank=True, null=True, default=identifier_default)
    periodIdentifier = models.JSONField(blank=True, null=True, default=identifier_default)
    mappings = models.JSONField(blank=True, null=True, default=list)


    def __str__(self):
        return f"{self.name}"

    def get_mappings(self):

        mappings = []

        mappings_raw = self.mappings

        for mapping in mappings_raw:

            obj = {
                'id': mapping['id'],
                'waibeHeader':  mapping['waibeHeader'],
                'clientHeaders': {
                    'current': mapping['clientHeaders'],
                    'previous': mapping['clientHeaders'],
                    'isError': False,
                    'unsaved_changes': False
                }
            }

            mappings.append(obj)
        
        return mappings

    def save(self, *args, **kwargs):

        if self.pk is None:
            mappings = {}
            if self.name == 'Holdings Report':
                mappings = HOLDINGS_REPORT_FIELDS

            elif self.name == 'Trial Balance':
                mappings = TRIAL_BALANCE_FIELDS

            elif self.name == 'Capital Report':
                mappings = CAPITAL_REPORT_FIELDS

            self.mappings = mappings
        
        super(ClientReport, self).save(*args, **kwargs) 


class ClientReportHeader(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=250, blank=True, null=True)
    waibe_name = models.CharField(max_length=250, blank=True, null=True)


    comments = models.CharField(max_length=500, blank=True, null=True)
    report = models.ForeignKey('supports.ClientReport', on_delete=models.SET_NULL, blank=True, null=True)
    active = models.BooleanField(default=True)
    defaultColumn = models.BooleanField(default=False)

    def __str__(self):
        return f"Report:{self.report}, Name:{self.name}"


