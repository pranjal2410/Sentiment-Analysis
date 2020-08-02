from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, fname, lname, state, city, twitter, password=None):
        if not email:
            raise ValueError("Please enter email")

        user = self.model(
            email=self.normalize_email(email),
            fname=fname,
            lname=lname,
            city=city,
            state=state,
            twitter=twitter
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=120, null=False, unique=True)
    fname = models.CharField(max_length=30, null=False, default="admin")
    lname = models.CharField(max_length=30, null=False, default="user")
    city = models.CharField(max_length=30, null=False, default="city")
    state = models.CharField(max_length=30, null=False, default="state")
    twitter = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.fname + " " + self.lname

    def get_short_name(self):
        return self.fname

    def __str__(self):
        return self.email

