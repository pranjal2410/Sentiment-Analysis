from django.contrib import admin
from django.urls import path, include

from app.views import RegisterView, LoginView, ProfileView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('admin/', admin.site.urls),
]
