from django.db import models
from main.models.mixins import RecordCreatedMixin


class SubAccount(RecordCreatedMixin):

    clientID = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=250, blank=True, null=True)
    number = models.CharField(max_length=250, blank=True, null=True)


    def __str__(self):
        return f'{self.description} - {self.number}'


class Balance(RecordCreatedMixin):

    fundID = models.IntegerField(blank=False, null=False)
    clientID = models.IntegerField(blank=False, null=False)
    periodID = models.IntegerField(blank=False, null=False)
    sub_account = models.ForeignKey('fs.SubAccount', on_delete=models.CASCADE, blank=True, null=True)

    ccyID = models.IntegerField(blank=False, null=False)
    amount = models.DecimalField(blank=True, null=True, max_digits=16, decimal_places=2)


    def __str__(self):
        return f'<Balance: {self.amount} FundID:{self.fundID} ClientID:{self.clientID} PeriodID:{self.periodID}>'