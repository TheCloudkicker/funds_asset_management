from django.db import models


class Currency(models.Model):

    full_name = models.CharField(blank=True, null=True, max_length=250)
    short_name = models.CharField(blank=True, null=True, max_length=100)
    symbol = models.CharField(blank=True, null=True, max_length=10)

    country = models.ForeignKey('main.Country', on_delete=models.SET_NULL, blank=True, null=True) 

    def __str__(self):
        return f"<Currency {self.short_name} >"