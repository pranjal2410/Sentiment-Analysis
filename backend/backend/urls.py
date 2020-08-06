from django.contrib import admin
from django.urls import path, include

from app.views import RegisterView, LoginView

urlpatterns = [
    path('', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/', admin.site.urls),
]
