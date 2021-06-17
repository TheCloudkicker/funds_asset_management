from django.urls import path

app_name = 'entities'

from entities.api import *

urlpatterns = [
    path('aliases/', AliasesAPI.as_view()),
    path('aliases/<pk>', AliasesAPI.as_view()),
    
    path('blocker-owners/<pk>', BlockerOwnersAPI.as_view()),
    path('blocker-owners/', BlockerOwnersAPI.as_view()),

    path('capital/', CapitalAPI.as_view()),
    path('capital/<pk>', CapitalAPI.as_view()),

    path('entity-ownerships/<pk>', EntityOwnershipsAPI.as_view()),
    path('entity-ownerships/', EntityOwnershipsAPI.as_view()),

    path('funds/', FundsAPI.as_view()),
    path('funds/<pk>', FundsAPI.as_view()),

    path('fund-criteria/<pk>', FundCriteriaAPI.as_view()),
    path('fund-criteria/', FundCriteriaAPI.as_view()),

    path('fund-header/<pk>', FundHeaderAPI.as_view()),
    path('fund-header/', FundHeaderAPI.as_view()),

    path('fund-setup/<pk>', FundSetupAPI.as_view()),
    path('fund-setup/', FundSetupAPI.as_view()),

    path('investors/<pk>', InvestorAPI.as_view()),
    path('investors/', InvestorAPI.as_view()),

    path('investments/<pk>', InvestmentAPI.as_view()),
    path('investments/', InvestmentAPI.as_view()),

    path('legacy/', LegacyDataAPI.as_view()),
    path('legacy/<pk>', LegacyDataAPI.as_view()),

    path('materiality/', MaterialityAPI.as_view()),
    path('materiality/<pk>', MaterialityAPI.as_view()),
    
    path('structure/<pk>', StructureAPI.as_view()),
    path('structure/', StructureAPI.as_view()),

]

