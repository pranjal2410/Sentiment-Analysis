from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('app.urls')),
    path('rest_auth/', include('rest_auth.urls')),
    path('admin/', admin.site.urls),
]
