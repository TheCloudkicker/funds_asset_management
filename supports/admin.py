from django.contrib import admin
from supports.models import SupportType, Support, ClientReport, ClientReportHeader, FundSupport, RecycledItem

class ClientReportAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class ClientReportHeaderAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class FundSupportAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class RecycledItemAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(ClientReport, ClientReportAdmin)
admin.site.register(ClientReportHeader, ClientReportHeaderAdmin)
admin.site.register(FundSupport, FundSupportAdmin)
admin.site.register(RecycledItem, RecycledItemAdmin)
admin.site.register(Support)
admin.site.register(SupportType)