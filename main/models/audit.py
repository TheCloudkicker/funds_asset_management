from django.db import models


BENCHMARK_CHOICES = (
    ( 'Net Assets','Net Assets' ),
    ( 'Net Income','Net Income' )
)


class AuditSettings(models.Model):

    name = models.CharField(blank=True, null=True, max_length=100)
    benchmark = models.CharField(max_length=50, blank=True, null=True, choices=BENCHMARK_CHOICES)
    overall = models.IntegerField(blank=True, null=True) #bps
    performance = models.IntegerField(blank=True, null=True) #bps
    deminimis = models.IntegerField(blank=True, null=True) #bps

    def __str__(self):
        try:
            return self.name
        except:
            return self.id
        


    def get_benchmark(self):

        if self.benchmark:
            return { 'value': self.benchmark, 'label':self.benchmark }
        else:
            return None

    def get_overall(self):
        if self.overall:
            return self.overall
        else:
            return 0

    def get_performance(self):
        if self.performance:
            return self.performance
        else:
            return 0

    def get_deminimis(self):
        if self.deminimis:
            return self.deminimis
        else:
            return 0
