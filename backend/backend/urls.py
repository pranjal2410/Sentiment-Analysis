from django.contrib import admin
from django.urls import path, include
from app.views import *

urlpatterns = [
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/login/', UserLoginView.as_view(), name='login'),
    path('admin/', admin.site.urls),
]
