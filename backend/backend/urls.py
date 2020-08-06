from django.contrib import admin
from django.urls import path, include

from app.views import RegisterView

urlpatterns = [
    path('', RegisterView.as_view(), name='register'),
    path('admin/', admin.site.urls),
]
