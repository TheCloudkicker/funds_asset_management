from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework import routers
from knox import views as knox_views
from django.conf.urls import url, include

from accounts.api.auth import RegisterAPI, LoginAPI, UserAPI
from accounts.api import *

app_name = "accounts"

router = routers.DefaultRouter()

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/register', RegisterAPI.as_view()),
    path('api/login', LoginAPI.as_view()),
    path('api/profiles', ProfilesAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('', include(router.urls))
]