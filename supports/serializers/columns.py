from rest_framework import serializers

from repository.models import RepositoryColumn, RepositoryType


class RepositoryColumnSerializer(serializers.ModelSerializer):
    
    selected = serializers.SerializerMethodField('get_is_selected')
    editable = serializers.SerializerMethodField('get_is_editable')
    error = serializers.SerializerMethodField('get_has_error')

    class Meta:
        model = RepositoryColumn
        fields = '__all__'
        extra_fields = ['selected','editable','error']

    def get_is_selected(self, obj):
        return False

    def get_is_editable(self, obj):
        return False

    def get_has_error(self, obj):
        return False



class RepositoryTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RepositoryType
        fields = '__all__'