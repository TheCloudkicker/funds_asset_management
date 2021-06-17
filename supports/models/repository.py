from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


class RepositoryType(RecordCreatedMixin):
    
    clientID = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=250, blank=True, null=True)
    key = models.CharField(max_length=25, blank=True, null=True)
    


    def __str__(self):
        return f"RepositoryType:{self.name}"


