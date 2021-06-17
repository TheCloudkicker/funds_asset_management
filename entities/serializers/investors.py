from rest_framework import serializers
from entities.models import Investor

class InvestorSerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = Investor
        fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.name
