from django.db import models


class FundParameter(models.Model):

    fund = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True)
    period = models.ForeignKey('main.Period', on_delete=models.SET_NULL, blank=True, null=True)

    includes = models.JSONField(blank=True, null=True, default=dict)
    overrideValues = models.JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return f"{self.fund} - {self.period}"


    def get_value(self, key):
        data = self.data
        try:
            value = data[key]
            return value
        except: return 0
            
    def update_includes(self, key, index, value):

        includes_data = self.includes

        key_includes = includes_data[key]

        if value == True:
            key_includes[index] = 1

        elif value == False:
            key_includes[index] = 0

        self.save()

        return

        

    def set_value(self, key, value):
        data = self.data
        data[key] = value
        self.save()
        return