from django.db import models
from main.models.mixins import RecordCreatedMixin


class GenericMapping(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)

    fsliID = models.IntegerField(blank=False, null=False)
    fsli = models.ForeignKey('fs.Fsli', on_delete=models.CASCADE, blank=True, null=True)

    accountID = models.IntegerField(blank=False, null=False)
    account = models.ForeignKey('fs.SubAccount', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'<Generic Mapping client:{self.clientID} fsli:{self.fsliID} acct:{self.accountID}>'


        
class CustomMapping(RecordCreatedMixin):

    clientID = models.IntegerField(blank=False, null=False)
    fundID = models.IntegerField(blank=False, null=False)

    fsli = models.ForeignKey('fs.Fsli', on_delete=models.CASCADE, blank=True, null=True)
    fsliID = models.IntegerField(blank=False, null=False)

    accountID = models.IntegerField(blank=False, null=False)
    account = models.ForeignKey('fs.SubAccount', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'<Custom Mapping client:{self.clientID} fsli:{self.fsliID} acct:{self.accountID}>'