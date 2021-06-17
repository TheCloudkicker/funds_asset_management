from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = 'Waibe'

from . import views

urlpatterns = [
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace="accounts")),
    path('api/entities/', include('entities.urls', namespace="entities")),
    path('api/fs/', include('fs.urls', namespace="fs")),
    path('api/main/', include('main.urls', namespace="main")),
    path('api/supports/', include('supports.urls', namespace="supports")),
    re_path(r'^(?:.*)/?', views.FrontendAppView.as_view()),
]

if not settings.IS_PRODUCTION:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.WORKERS_URL, document_root=settings.WORKERS_ROOT)
