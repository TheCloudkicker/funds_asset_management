from django.urls import path

app_name = 'main'

from main.api import *

urlpatterns = [
    path('audit/<pk>', AuditAPI.as_view()),
    path('audit/', AuditAPI.as_view()),
    path('currency/<pk>', CurrencyAPI.as_view()),
    path('currency/', CurrencyAPI.as_view()),
    path('reset/', ResetAPI.as_view()),
    path('periods/<pk>', PeriodsAPI.as_view()),
    path('periods/', PeriodsAPI.as_view()),
    path('settings/<pk>', SettingsAPI.as_view()),
    path('settings/', SettingsAPI.as_view()),
]

