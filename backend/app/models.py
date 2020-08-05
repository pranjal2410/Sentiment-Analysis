from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=120, null=False, unique=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    twitter = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
