from django.contrib import admin
from .models import (
    Fund, FundAltName, EntityOwnership, LegacyData, FundCriteriaDef, CapitalMovement,
    Investor, InvestorCommit, Investment, InvestmentOwnership, FundPeriodMateriality
)

class FundAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class EntityOwnershipAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)


class FundCriteriaDefeAdmin(admin.ModelAdmin):
    list_display = ('text', 'criteriaType')


admin.site.register(EntityOwnership, EntityOwnershipAdmin)

admin.site.register(CapitalMovement)
admin.site.register(Fund, FundAdmin)
admin.site.register(FundAltName)
admin.site.register(FundCriteriaDef,FundCriteriaDefeAdmin)
admin.site.register(FundPeriodMateriality)

admin.site.register(Investment)
admin.site.register(InvestmentOwnership)
admin.site.register(InvestorCommit)
# admin.site.register(InvestorCriteriaDef)
admin.site.register(LegacyData)
