from django.db import models


class ClientValue(models.Model):

    fund = models.ForeignKey('entities.Fund', on_delete=models.SET_NULL, blank=True, null=True)
    period = models.ForeignKey('main.Period', on_delete=models.SET_NULL, blank=True, null=True)
    data = models.JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return f"{self.fund} - {self.period}"

    def get_json(self, key):

        value = self.get_value('carry')

        return {
                    'id': self.id,
                    'current': value,
                    'previous': value,
                    'unsaved_changes': False,
                    'isError': False,
                    'readOnly': True
            }


    def get_value(self, key):
        data = self.data
        try:
            value = data[key]
            return value
        except: return 0
            
    def set_value(self, key, value):
        data = self.data
        data[key] = value
        self.save()
        return