from rest_framework import serializers
from main.models import Administrator, Depository, InvestmentManager

class AdministratorSerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = Administrator
        fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.name

class DepositorySerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = Depository
        fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.name

class InvestmentManagerSerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = InvestmentManager
        fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.name

