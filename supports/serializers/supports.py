from rest_framework import serializers

from supports.models import Support


class SupportSerializer(serializers.ModelSerializer):

    dateCreated = serializers.SerializerMethodField('get_dateCreated')
    unsaved_changes = serializers.SerializerMethodField('get_unsaved_changes')

    class Meta:
        model = Support
        fields = ['attachment','dateCreated','fileName', 'unsaved_changes']
        extra_fields = ['dateCreated', 'unsaved_changes']

    def get_dateCreated(self, obj):
        return obj.created_dt.strftime("%Y-%m-%d")

    def get_unsaved_changes(self, obj):
        return False