from django.contrib import admin

from .models import *


admin.site.register(AuditSettings)
admin.site.register(Currency)
admin.site.register(Settings)
admin.site.register(Period)
admin.site.register(Administrator)
admin.site.register(Depository)
admin.site.register(InvestmentManager)
