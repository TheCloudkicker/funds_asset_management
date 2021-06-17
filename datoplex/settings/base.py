import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


DEBUG = True
IS_PRODUCTION = False

from platform import system as psystem
if psystem() == 'Linux':
    IS_PRODUCTION = True

DATA_UPLOAD_MAX_NUMBER_FIELDS = 100000
DATA_UPLOAD_MAX_MEMORY_SIZE = 26214400

ALLOWED_HOSTS = [
    '34.69.12.251','127.0.0.1',
    'localhost','35.223.142.216',
    'waibe.io','www.waibe.io'
    ]


INSTALLED_APPS = [
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    
    'rest_framework',
    'drf_firebase_auth',
    'knox',

    'frontend',
    'accounts',
    'entities',
    'fs',
    'main',
    'supports',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': [
    'drf_firebase_auth.authentication.FirebaseAuthentication',
  ]
}
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',),
# }
DRF_FIREBASE_AUTH = {
    # path to JSON file with firebase secrets
    'FIREBASE_SERVICE_ACCOUNT_KEY': os.path.join(BASE_DIR,'datoplex/firebase_service_account.json'),
    # allow creation of new local user in db
    'FIREBASE_CREATE_LOCAL_USER': True,
    # attempt to split firebase user.display_name and set local user
    # first_name and last_name
    'FIREBASE_ATTEMPT_CREATE_WITH_DISPLAY_NAME': True,
    # commonly JWT or Bearer (e.g. JWT <token>)
    'FIREBASE_AUTH_HEADER_PREFIX': 'JWT',
    # verify that JWT has not been revoked
    'FIREBASE_CHECK_JWT_REVOKED': True,
    # require that firebase user.email_verified is True
    'FIREBASE_AUTH_EMAIL_VERIFICATION': False
}



ROOT_URLCONF = 'datoplex.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:8000"
]


WSGI_APPLICATION = 'datoplex.wsgi.application'

REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
WORKERS_URL = '/workers/'
WORKERS_ROOT = os.path.join(BASE_DIR, 'workers')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

FIXTURE_DIRS = (
   os.path.join(BASE_DIR, 'fixtures'),
)




