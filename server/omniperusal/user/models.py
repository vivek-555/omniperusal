from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from omniperusal.utility.choices.timezones import TIMEZONE_CHOICES
from omniperusal.utility.choices.countries import COUNTRY_CHOICES


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):
        user = self.model(email=email, is_staff=True, is_superuser=True, **kwargs)
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser):
    email = models.EmailField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=255, choices=COUNTRY_CHOICES, null=True, blank=True)
    timezone = models.CharField(max_length=100, choices=TIMEZONE_CHOICES, null=True, blank=True)
    # groups = models.ForeignKey(Group, related_name='group')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # set username same as email
        self.username = self.email
        super(User, self).save(*args, **kwargs)
