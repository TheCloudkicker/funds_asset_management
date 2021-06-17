import json
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


FORM_TYPES = (
    ('input', 'input'),
    ('select', 'select'),
    ('bool', 'bool'),
    ('date', 'date'),
)

CRITERIA_TYPES = (
    ('fund', 'fund'),
    ('investment', 'investment'),
    ('investor', 'investor'),
)


class FundCriteriaDef(RecordCreatedMixin):
    
    text = models.CharField(blank=False, null=False, max_length=250)
    key = models.CharField(blank=True, null=True, max_length=250)

    uuid = models.CharField(blank=True, null=True, max_length=250)
    formType = models.CharField(choices=FORM_TYPES, blank=True, null=True, max_length=250)
    relatedObjectName = models.CharField(blank=True, null=True, max_length=100)

    placeholder = models.CharField(blank=True, null=True, max_length=100)
    isRequired = models.BooleanField(default=False)
    isMulti = models.BooleanField(default=False)

    criteriaType = models.CharField(choices=CRITERIA_TYPES, blank=True, null=True, max_length=250)

    def __str__(self):
        return f'{self.text}'
    


    
