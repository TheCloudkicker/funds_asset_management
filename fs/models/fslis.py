from django.db import models

from main.models.mixins import RecordCreatedMixin


class Fsli(RecordCreatedMixin):

    FSLI_TYPES = (
        ('Asset','Asset'),
        ('Liability','Liability'),
        ('Equity','Equity'),
        ('Income','Income'),
        ('Expense','Expense'),
    )

    clientID = models.IntegerField(blank=True, null=True)

    name = models.CharField(blank=True, null=True, max_length=250)
    fsli_type = models.CharField(choices=FSLI_TYPES, blank=True, null=True, max_length=25)

    def __str__(self):
        return f'{self.name} {self.fsli_type}'