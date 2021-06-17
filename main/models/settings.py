from django.db import models

DATE_FORMAT_OPTIONS = (
    ('MM-DD-YYYY', 'MM-DD-YYYY'),
    ('DD-MM-YYYY', 'DD-MM-YYYY' ),
)

class Settings(models.Model):

    app_name = models.CharField(max_length=250, blank=True, null=True)
    rounding_tolerance = models.DecimalField(blank=True, null=True, max_digits=16, decimal_places=2)
    date_format = models.CharField(max_length=50, blank=True, null=True, choices=DATE_FORMAT_OPTIONS, default='MM-DD-YYYY')
    default_ccy = models.ForeignKey('main.Currency', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return "In DB Settings"
