import json
from django.db import models
from django.apps import apps
from django.db.models import Sum



class FundPeriodMateriality(models.Model):

    uuid = models.CharField(blank=True, null=True, max_length=250)
    fund = models.ForeignKey('entities.Fund', on_delete=models.CASCADE, blank=True, null=True)
    period = models.ForeignKey('main.Period', on_delete=models.CASCADE, blank=True, null=True)
    audit_setting = models.ForeignKey('main.AuditSettings', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'{self.fund}-{self.period}-{self.audit_setting}'

    def save(self, *args, **kwargs):
        if self.pk is None:
            AuditSettings = apps.get_model('main', 'AuditSettings')

            try:
                audit_setting = AuditSettings.objects.first()
                self.audit_setting = audit_setting
            except:
                pass


        super(FundPeriodMateriality, self).save(*args, **kwargs)

    def get_audit_setting(self):
        if self.audit_setting:
            return { 
                'value': self.audit_setting_id, 
                'label': self.audit_setting.name,
                'overall': self. audit_setting.overall,
                'performance': self. audit_setting.performance,
                'deminimis': self. audit_setting.deminimis,
                
                }
        else:
            return None
