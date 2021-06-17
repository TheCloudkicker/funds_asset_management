from django.contrib import admin
from fs.models import *


class OverrideValueAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class FsliAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    search_fields = ['id',]

class GenericMappingAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    
class CustomMappingAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(OverrideValue, OverrideValueAdmin)
admin.site.register(ClientValue)
admin.site.register(FundParameter)
admin.site.register(Fsli, FsliAdmin)
admin.site.register(GenericMapping, GenericMappingAdmin)
admin.site.register(CustomMapping, CustomMappingAdmin)
