from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)


class UserManager(BaseUserManager):
    def create_user(self, email, fname, lname, city, state, twitter, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not fname:
            raise ValueError("User must have fname")
        if not lname:
            raise ValueError("User must have lname")
        if not city:
            raise ValueError("User must have city")
        if not state:
            raise ValueError("User must have state")
        user = self.model(
            email=self.normalize_email(email),
            fname=self.fname,
            lname=self.lname,
            city=self.city,
            state=self.state,
            twitter=self.twitter
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staff(self, email, password):
        user = self.create_user(email, password, "staff", "staff", "city", "state", False)
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_super_user(self, email, password):
        user = self.create_user(email, password, "admin", "admin", "city", "state", False)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=120, null=False, unique=True)
    fname = models.CharField(max_length=30, null=False)
    lname = models.CharField(max_length=30, null=False)
    city = models.CharField(max_length=30, null=False)
    state = models.CharField(max_length=30, null=False)
    twitter = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'lname', 'city', 'state', 'twitter']

    def get_full_name(self):
        return f'{self.fname} {self.lname}'

    def get_short_name(self):
        return f'{self.fname}'

    def __str__(self):
        return f'{self.fname} {self.lname}'
