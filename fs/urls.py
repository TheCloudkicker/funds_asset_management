from django.urls import path
from fs.api import *

app_name = 'fs'

urlpatterns = [
    path('fslis/', FslisAPI.as_view()),
    path('generic_mappings/', GenericMappingAPI.as_view()),
    path('custom_mappings/', CustomMappingAPI.as_view()),
    path('unmapped/', UnmappedAPI.as_view()),
    path('balances/', BalancesAPI.as_view()),
    path('override-value/', OverrideValueAPI.as_view()),
    path('accounts/', AccountsAPI.as_view()),
    # path('', TrialBalanceAPI.as_view()),
    path('', FsAPI.as_view()),
    path('testing/', LandingAPI.as_view()),
    path('testing-summary/', TestingSummaryAPI.as_view()),
    path('carry-calc/', CarryCalcAPI.as_view()),
    path('client-value/', ClientValueAPI.as_view()),
    path('detail/', DetailAPI.as_view()),
    path('params/', FundParamsAPI.as_view()),
]

