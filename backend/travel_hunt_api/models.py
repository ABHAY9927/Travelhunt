# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.CharField(max_length=8, primary_key=True)
    email = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10)
    username = models.CharField(max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','password','role']

    class Meta:
        db_table = "user"


class Traveller(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=128)
    lastname = models.CharField(max_length=128)
    mobile = models.CharField(max_length=10)

    class Meta:
        db_table = "traveller"


class HotelOwner(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=128)
    lastname = models.CharField(max_length=128)
    business_address = models.CharField(max_length=256)
    business_tel = models.CharField(max_length=10)
    business_reg_no = models.CharField(max_length=25)

    class Meta:
        db_table = "hotel_owner"


class Country(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=256)
    code = models.CharField(max_length=3)
    description = models.CharField(max_length=4096)
    flag = models.CharField(max_length=1024)

    class Meta:
        db_table = "country"


class City(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=128)
    latitude = models.DecimalField(max_digits=10, decimal_places=2)
    longitude = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=4096)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE)
    image1 = models.CharField(max_length=512)
    image2 = models.CharField(max_length=512)
    image3 = models.CharField(max_length=512)

    class Meta:
        db_table = "city"


class Location(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=128)
    category = models.CharField(max_length=128)
    description = models.CharField(max_length=1024)
    image1 = models.CharField(max_length=2048)
    image2 = models.CharField(max_length=2048)
    image3 = models.CharField(max_length=2048)
    city = models.ForeignKey(
        City, on_delete=models.CASCADE)

    class Meta:
        db_table = "location"


class Hotel(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=128, default="N/A")
    city = models.ForeignKey(City, on_delete=models.CASCADE, default="N/A")
    description = models.CharField(max_length=2048, blank=True)
    wifi = models.BooleanField(blank=False, default=False)
    parking = models.BooleanField(blank=False, default=False)
    pool = models.BooleanField(blank=False, default=False)
    restaurant = models.BooleanField(blank=False, default=False)
    pub = models.BooleanField(blank=False, default=False)
    transport = models.BooleanField(blank=False, default=False)
    image1 = models.CharField(max_length=2048, default="N/A")
    image2 = models.CharField(max_length=2048, default="N/A")
    image3 = models.CharField(max_length=2048, default="N/A")

    class Meta:
        db_table = "hotel"


class Trip(models.Model):
    name = models.CharField(max_length=64, default="N/A")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateField(auto_now=False, auto_now_add=False, default="N/A")
    end = models.DateField(auto_now=False, auto_now_add=False, default="N/A")
    is_complete = models.BooleanField(blank=False, default=False)
    locations = models.JSONField(default=list)  # Store list properly

    class Meta:
        db_table = "trip"
