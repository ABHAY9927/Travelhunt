from django.contrib import admin
from .models import Country
from .models import City
from .models import Location
from .models import User
from .models import Hotel
from .models import Trip
from .models import HotelOwner
from .models import Traveller

# Register your models here.
admin.site.register(Country)
admin.site.register(City)
admin.site.register(Location)
admin.site.register(Hotel)
admin.site.register(Trip)
admin.site.register(User)
admin.site.register(HotelOwner)
admin.site.register(Traveller)
