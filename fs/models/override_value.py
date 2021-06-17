import json
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin




class OverrideValue(RecordCreatedMixin):

    fund = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True)
    period = models.ForeignKey('main.Period', on_delete=models.SET_NULL, blank=True, null=True)
    
    uuid = models.CharField(blank=True, null=True, max_length=250)
    value = models.CharField(blank=True, null=True, max_length=250)

    def __str__(self):
        return f'Legacy {self.fund}'
