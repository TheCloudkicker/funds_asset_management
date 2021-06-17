from django.db import models


class City(models.Model):

    full_name = models.CharField(blank=True, null=True, max_length=250)
    short_name = models.CharField(blank=True, null=True, max_length=100)

    def __str__(self):
        return f"<City {self.name} >"