import json
from django.db import models


class RecycledItem(models.Model):


    reducerName = models.CharField(blank=True, null=True, max_length=100)
    arrayName = models.CharField(blank=True, null=True, max_length=100)
    

    dateDeleted = models.DateField(blank=True, null=True)
    deletedBy = models.CharField(blank=True, null=True, max_length=250)

    data = models.JSONField(blank=True, null=True)


    def __str__(self):
        return f'{self.reducerName} - {self.arrayName} Deleted by {self.deletedBy}'


