from .base import *

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

CORS_ORIGIN_ALLOW_ALL = False

DEBUG = False
# SESSION_COOKIE_SECURE = True

#STORAGE
# DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
# GS_BUCKET_NAME = 'alphapanda-gp-info'
# credentials_path = os.path.join(BASE_DIR, 'alphapanda/Service_Account_Credentials.json')
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

#DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'waibe_main',
        'USER':'thecloudkicker',
        'PASSWORD': 'savegotham',
        'HOST':'127.0.0.1',
        'PORT': '5432'
    },
    'clients': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'pg_clients',
        'USER':'thecloudkicker',
        'PASSWORD': 'savegotham',
        'HOST':'127.0.0.1',
        'PORT': '5433'
    }
}



DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'waibe-fund-support-demo'
credentials_path = os.path.join(BASE_DIR, 'datoplex/Service_Account_Credentials.json')
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path


STATIC_ROOT = os.path.join(REACT_APP_DIR, 'build', 'static')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
