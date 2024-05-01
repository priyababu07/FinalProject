# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class Machine(models.Model):
    name = models.CharField(max_length=255)
    base_power_consumption = models.FloatField()
    # historical_peak_usage = models.CharField(max_length=10)  # Change to CharField for more detailed information
    production_rate = models.FloatField()

class MachinePowerHistory(models.Model):
    machine = models.CharField(max_length=255)
    timestamp = models.DateTimeField()
    power_consumption = models.FloatField()
    is_peak = models.BooleanField()

    # def save(self, *args, **kwargs):
    #     # Ensure is_peak is equal to historical_peak_usage of the associated machine
    #     self.is_peak = self.machine.historical_peak_usage
    #     super().save(*args, **kwargs)

# class MachineData(models.Model):
#     machine_name = models.CharField(max_length=50)
#     base_power_consumption = models.IntegerField()
#     production_rate = models.IntegerField()
#     timestamp = models.DateTimeField(auto_now_add=True)
    
class machine_data(models.Model):
    machine_ids = models.CharField(max_length=255)
    timestamps = models.FloatField()
    current = models.FloatField()
    voltage = models.FloatField()
    power_consumed = models.FloatField()
    useful_output = models.FloatField()
    efficiency =  models.FloatField()
    peak_times = models.CharField(max_length=255)

class dummy_data(models.Model):
    voltage = models.IntegerField()
    current = models.IntegerField()
    power  = models.IntegerField()

class automatic(models.Model):
    # currentSlot = models.IntegerField()
    # machine_id = models.CharField(max_length=255)
    # power = models.FloatField()
    machine_id = models.CharField(max_length=100)
    useful_output = models.FloatField()
    power_consumed = models.FloatField()
    efficiency = models.FloatField()
    peak_time_category = models.IntegerField()


class automaticHistory(models.Model):
    machine_id = models.CharField(max_length=100)
    useful_output = models.FloatField()
    power_consumed = models.FloatField()
    efficiency = models.FloatField()
    peak_time_category = models.IntegerField()

# model for user login ang sign up




class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'Users'

    def __str__(self):
        return self.email


