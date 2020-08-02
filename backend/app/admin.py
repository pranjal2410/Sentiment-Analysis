from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from . models import *
from . forms import *


class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    list_display = ('email', 'fname', 'lname', 'is_superuser', 'twitter')
    list_filter = ('is_superuser', 'twitter')
    fieldsets = (
        ('User Credentials', {'fields' : ('email', 'password')}),
        ('Personal Details', {'fields' : ('fname', 'lname', 'twitter')}),
        ('Location Details', {'fields' : ('city', 'state')}),
        ('Rights', {'fields': ('is_staff', 'is_superuser')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2', )
        })
    )
    search_fields = ('email', 'fname', 'lname', 'city', 'state')
    ordering = ('email', 'fname', 'lname', 'city', 'state')
    filter_horizontal = ()


admin.site.site_header = 'Sentiment Analysis'
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)