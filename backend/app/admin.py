from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_superuser', 'twitter')
    list_filter = ('is_superuser', 'twitter')
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal Details', {'fields': ('first_name', 'last_name', 'twitter')}),
        ('Location Details', {'fields': ('city', 'state')}),
        ('Rights', {'fields': ('is_staff', 'is_superuser')})
    )


admin.site.site_header = 'Sentiment Analysis'
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
