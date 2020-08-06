from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(unique=True)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=50)
    twitter = models.BooleanField(default=False)

    def __str__(self):
        return self.username