from django.db import models
from django.apps import apps
from django.db.models import Sum

from main.models.mixins import RecordCreatedMixin


OWNERSHIP_TYPES = (
    ('COMBINED','COMBINED'),
    ('SHARED','SHARED'),
    ('CONSOLIDATED','CONSOLIDATED'),
)


class EntityOwnership(RecordCreatedMixin):

    owner_entity = models.ForeignKey('entities.Fund', related_name='owner_entity', on_delete=models.SET_NULL, blank=True, null=True)
    owned_entity = models.ForeignKey('entities.Fund', related_name='owned_entity', on_delete=models.SET_NULL, blank=True, null=True)
    ownership_percentage = models.DecimalField(max_digits=12, decimal_places=8, blank=True, null=True)
    ownership_type = models.CharField(max_length=50, blank=True, null=True, choices=OWNERSHIP_TYPES)

    def __str__(self):
        return f'{self.owner_entity} => {self.owned_entity}'
