# from rest_framework import serializers
# from setup.models import FundCriterionHeader




# class FundCriterionHeaderSerializer(serializers.ModelSerializer):

#     selected = serializers.SerializerMethodField('get_is_selected')
#     editable = serializers.SerializerMethodField('get_is_editable')
#     error = serializers.SerializerMethodField('get_has_error')
#     saved = serializers.SerializerMethodField('get_is_saved')
#     original = serializers.SerializerMethodField('get_original')
#     value = serializers.SerializerMethodField('get_value')
#     label = serializers.SerializerMethodField('get_label')

#     class Meta:
#         model = FundCriterionHeader
#         fields = '__all__'
#         extra_fields = ['selected','editable','error','saved','original','value','label']

#     def get_value(self, obj):
#         return obj.id

#     def get_label(self, obj):
#         return obj.name

#     def get_is_selected(self, obj):
#         return False

#     def get_is_editable(self, obj):
#         return False

#     def get_has_error(self, obj):
#         return False

#     def get_is_saved(self, obj):
#         return True

#     def get_original(self, obj):
#         return obj.name
