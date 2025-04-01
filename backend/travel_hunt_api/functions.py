from .models import Location
from .models import Hotel
import ast


def placesInCity(city_id):
    data = []
    places = Location.objects.select_related('city').filter(city_id=city_id)

    for place in places:
        element = {
            'location_id': place.id,
            'location_name': place.name,
            'location_category': place.category,
            'location_desc': place.description,
            'image': place.image1
        }

        data.append(element)

    return data


def hotelsInCity(city_id):
    data = []
    hotels = Hotel.objects.select_related('city').filter(city_id=city_id)

    for hotel in hotels:
        element = {
            'hotel_id': hotel.id,
            'hotel_name': hotel.name,
            'hotel_desc': hotel.description,
            'image1': hotel.image1,
            # 'image2': hotel.image2,
            # 'image3': hotel.image3,
            # 'wifi': hotel.wifi,
            # 'parking': hotel.parking,
            # 'pool': hotel.pool,
            # 'restaurant': hotel.restaurant,
            # 'pub': hotel.pub
        }

        data.append(element)

    return data


def getTrips(trips):
    data = []

    for trip in trips:
        trip_id = trip["id"]
        trip_name = trip["name"]
        start = trip["start"]
        end = trip["end"]
        is_complete = ""

        if(trip["is_complete"] == False):
            is_complete = "No"
        else:
            is_complete = "Yes"

        places = ast.literal_eval(trip["locations"])
        locations = []
        for place in places:
            if(place[0] == "L"):
                location_name = Location.objects.filter(id=place).values('name')
                locations.append(location_name[0]["name"])
            else:
                location_name = Hotel.objects.filter(id=place).values('name')
                locations.append(location_name[0]["name"])

        items = {
            'id': trip_id,
            'name': trip_name,
            'start': start,
            'end': end,
            'is_complete': is_complete,
            'locations': locations 
        }

        data.append(items)

    return data


def mapTinyInt(value):
    if (value == 1):
        return "Yes"
    else:
        return "No"