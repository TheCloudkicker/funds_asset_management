from django.urls import path

app_name = 'supports'

from supports.api import *

urlpatterns = [
    path('data/', DataAPI.as_view()),
    path('database/', DatabaseAPI.as_view()),
    path('db/', DatabaseAPI2.as_view()),
    path('client-report/', ClientReportAPI.as_view()),
    
    path('recycle/', RecycleAPI.as_view()),
    path('report/', ReportAPI.as_view()),
    path('repository/', RepositoryAPI.as_view()),

    path('upload/', SupportUploadAPI.as_view()),
    path('', SupportAPI.as_view()),
    path('<pk>', SupportAPI.as_view()),
]

