# Create your views here.
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .functions import placesInCity
from .functions import hotelsInCity
from .functions import mapTinyInt
from .models import City
from .models import Location
from .models import Hotel
from django.http import JsonResponse
# from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model


import logging

User = get_user_model()  
logger = logging.getLogger(__name__) 

@csrf_exempt
def forgot_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"error": "Email field is required"}, status=400)

            user = User.objects.filter(email=email).first()
            if not user:
                return JsonResponse({"error": "User not found"}, status=400)

            token = get_random_string(50)
            user.reset_token = token
            user.save()

            reset_link = f"http://localhost:3000/reset-password/{token}"
            logger.info(f"Sending reset link to: {email}")  

            send_mail(
                "Password Reset Request",
                f"Click the link below to reset your password:\n{reset_link}",
                "your-email@gmail.com",
                [email],
                fail_silently=False,
            )

            logger.info("Email sent successfully") 
            return JsonResponse({"message": "Password reset email sent."})

        except Exception as e:
            logger.error(f"Error in forgot_password: {str(e)}") 
            return JsonResponse({"error": "Something went wrong"}, status=500)

@api_view(['GET'])
def check_city(request, city_name):
    requested_city_id = ""
    country = ""

    arr = city_name.split(" ", 1)
    if len(arr) > 1:
        country = arr[1]

    cityWithCountry = City.objects.select_related('country')

    print("Searching for:", city_name)  # Debugging

    for city in cityWithCountry:
        print(f"DB: {city.name.lower()} - {city.country.name.lower()}")  # Debugging

        if ((city.name.lower() == arr[0].lower() and city.country.name.lower() == country.lower()) or
                (city.name.lower() == arr[0].lower())):
            requested_city_id = city.id
            requested_city_name = city.name
            print("Match found:", requested_city_name)  # Debugging

    if requested_city_id != "":
        return Response({"city_id": requested_city_id, "city_name": requested_city_name}, status=status.HTTP_200_OK)

    print("No match found!")  # Debugging
    return Response({"msg": "No Data Available"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def get_city(request, city_id):
    cityWithCountry = City.objects.select_related('country').filter(id=city_id)
    places = placesInCity(city_id)
    hotels = hotelsInCity(city_id)

    for city in cityWithCountry:
        return Response(
            {
                "city_id": city.id,
                "city_name": city.name,
                "latitude": city.latitude,
                "longitude": city.longitude,
                "city_description": city.description,
                "image1": city.image1,
                "image2": city.image2,
                "image3": city.image3,
                "country_id": city.country.id,
                "country_name": city.country.name,
                "country_code": city.country.code,
                "country_description": city.country.description,
                "country_flag": city.country.flag,
                "places": places,
                "hotels": hotels
            }
        )

    return Response({"msg": "No Data Available"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_location(request, location_id):
    locationWithCity = Location.objects.select_related(
        'city').filter(id=location_id)

    if(len(locationWithCity) > 0):
        location = locationWithCity[0]

        cityWithCountry = City.objects.select_related(
            'country').filter(id=location.city.id)

        if(len(cityWithCountry) > 0):
            return Response(
                {
                    'id': location.id,
                    'name': location.name,
                    'category': location.category,
                    'description': location.description,
                    'image1': location.image1,
                    'image2': location.image2,
                    'image3': location.image3,
                    'city_name': location.city.name,
                    'latitude': location.city.latitude,
                    'longitude': location.city.longitude,
                    'country_name': location.city.country.name
                }
            )
        
    return Response(
        {'error': 'No Data Available'}
    )


@api_view(['GET'])
def get_hotel(request, hotel_id):
    hotelWithCity = Hotel.objects.select_related('city').filter(id=hotel_id)

    if hotelWithCity.exists():
        hotel = hotelWithCity.first()  # Correct way to get first result

        return JsonResponse({
            'id': hotel.id,
            'name': hotel.name,
            'description': hotel.description,
            'wifi': mapTinyInt(hotel.wifi),
            'parking': mapTinyInt(hotel.parking),
            'pool': mapTinyInt(hotel.pool),
            'restaurant': mapTinyInt(hotel.restaurant),
            'pub': mapTinyInt(hotel.pub),
            'transport': mapTinyInt(hotel.transport),
            'image1': hotel.image1.url if hotel.image1 else None,
            'image2': hotel.image2.url if hotel.image2 else None,
            'image3': hotel.image3.url if hotel.image3 else None,
        })

    return JsonResponse({'error': 'Hotel not found'}, status=404)
    
@api_view(['GET'])
def get_popular_city(request):
    # Randomly order the cities and select the first 10
    cities = City.objects.order_by('id')[:12]  # Oldest first

    # List to store the places for each city
    city_data = []

    # Iterate through the randomly selected cities
    for city in cities:
        city_data.append({
            "city_id": city.id,
            "city_name": city.name,
            "image2": city.image2,
        })

    if len(city_data) > 0:
        return Response({"cities": city_data})

    else:
        return Response({"msg": "An error occurred"})


@api_view(["POST"])
def get_hotels(request):
    hotels = Hotel.objects.all().values()
    return Response({'data': hotels})


class LoginView(APIView):
    # Home View is only available for authenticated users
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # print(request.user)
        content = {"message": "success"}
        return Response(content)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated,]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
