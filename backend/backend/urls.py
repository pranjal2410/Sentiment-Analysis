from django.contrib import admin
from django.urls import path

from app.views import RegisterView, LoginView, ProfileView, EditView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('api/edit/', EditView.as_view(), name='edit'),
    path('admin/', admin.site.urls),
]
