from rest_framework import serializers
from main.models import Currency

class CurrencySerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = Currency
        fields = '__all__'
        extra_fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return f'{obj.short_name} ({obj.symbol})'