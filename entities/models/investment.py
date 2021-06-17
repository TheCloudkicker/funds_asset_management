import json
from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin



class Investment(RecordCreatedMixin):

    uuid = models.CharField(blank=True, null=True, max_length=250)
    name = models.CharField(max_length=250, blank=True, null=True)


    def __str__(self):
        return f'{self.name}'

    def get_criterias(self):
        return []



class InvestmentOwnership(RecordCreatedMixin):

    owner = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True, related_name="investment_owner")
    investment = models.ForeignKey('entities.Investment', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'{self.owner} => {self.investment}'