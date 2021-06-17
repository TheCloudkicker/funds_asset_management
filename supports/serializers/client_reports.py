from rest_framework import serializers
from supports.models import ClientReportHeader




class ClientReportHeaderSerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')

    class Meta:
        model = ClientReportHeader
        fields = '__all__'
        extra_fields = ['value','label']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.name
