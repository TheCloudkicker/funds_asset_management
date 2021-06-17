from rest_framework import serializers
from main.models import Period



class PeriodSerializer(serializers.ModelSerializer):

    value = serializers.SerializerMethodField('get_value')
    label = serializers.SerializerMethodField('get_label')
    name = serializers.SerializerMethodField('get_name')
    start = serializers.SerializerMethodField('get_start')
    end = serializers.SerializerMethodField('get_end')

    class Meta:
        model = Period
        fields = '__all__'
        extra_fields = ['value','label','start','end', 'name']

    def get_value(self, obj):
        return obj.id

    def get_label(self, obj):
        return obj.end_date.strftime('%m-%d-%Y')
        
    def get_name(self, obj):
        return obj.end_date.strftime('%m-%d-%Y')

    def get_start(self, obj):
        return obj.start_date.strftime('%m-%d-%Y')

    def get_end(self, obj):
        return obj.end_date.strftime('%m-%d-%Y')
