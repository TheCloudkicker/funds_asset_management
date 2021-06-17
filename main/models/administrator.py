import json
from django.db import models
from django.apps import apps
from django.db.models import Sum




class Administrator(models.Model):

    uuid = models.CharField(blank=True, null=True, max_length=250)
    name = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'
