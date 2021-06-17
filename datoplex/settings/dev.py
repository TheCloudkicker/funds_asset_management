from .base import *
import os

DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
MIDDLEWARE.append('datoplex.middleware.dev_cors_middleware')


#STORAGE
# DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
# GS_BUCKET_NAME = 'alphapanda-gp-info'
# credentials_path = os.path.join(BASE_DIR, 'alphapanda/Service_Account_Credentials.json')
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'waibe_main',
        'USER':'thecloudkicker',
        'PASSWORD': 'savegotham',
        'HOST':'127.0.0.1',
        'PORT': '5432'
    },
}



STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'staticfiles'),
]

DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'waibe-fund-support-demo'
credentials_path = os.path.join(BASE_DIR, 'datoplex/Service_Account_Credentials.json')
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path