
from django.db import models
from django.utils import timezone


class RecordCreatedMixin(models.Model):
    
    class Meta:
        abstract = True

    created_userID = models.IntegerField(blank=True, null=True)
    created_dt = models.DateTimeField(blank=True, null=True)
    sourceID = models.CharField(blank=True, null=True, max_length=100)


    def save(self, *args, **kwargs):
        if not self.id:
            self.created_dt = timezone.now()
        return super(RecordCreatedMixin, self).save(*args, **kwargs)