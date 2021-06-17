from django.db import models

from main.models.mixins import RecordCreatedMixin


class Period(models.Model):

    clientID = models.IntegerField(blank=False, null=False)
    start_date = models.DateTimeField(blank=False, null=False)
    end_date = models.DateTimeField(blank=False, null=False)
    active = models.BooleanField(default=False)

    def __str__(self):
        start_string = self.start_date.strftime('%m-%d-%Y')
        end_string = self.end_date.strftime('%m-%d-%Y')
        return f'{start_string} => {end_string}' 




