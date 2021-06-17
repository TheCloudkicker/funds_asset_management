from django.db import models

class LegalType(models.Model):

    name = models.CharField(blank=True, null=True, max_length=100)

    def __str__(self):
        return f"<LegalType {self.name} >"