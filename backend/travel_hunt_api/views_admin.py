from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from .serializers import HotelOwnerSerializer
import copy


@api_view(['POST'])
def validate_signup(request):
    """
        Handles the signup of a new user

        Arduments: A HTTP request object [POST]

        Returns: A HTTP_STATUS_CODE
    """

    # Check whether passwords match
    password1 = request.POST.get("password1")
    password2 = request.POST.get("password2")
    email = request.data["email"]
    user = User.objects.filter(email=email).first()

    # check email already exist or not
    if user is not None:
        return Response({
            "error": "This email already registered"
        })

    elif(password1 == password2):
        try:
            # If passwords match create a copy of responses and remove the two fields
            recieved_data = request.POST.copy()
            recieved_data.pop('password1')
            recieved_data.pop('password2')

            print(recieved_data)

            # Make data required for the User and Traveller tables
            # copy module is used to prevent making references to the original value
            user_data = copy.copy(recieved_data)
            business_data = copy.copy(recieved_data)

            # Remove unnecessary fields
            user_data.pop('firstname')
            user_data.pop('lastname')
            user_data.pop('business_tel')
            user_data.pop('business_reg_no')
            user_data.pop('business_address')

            # Remove unnecessary fields
            business_data.pop('email')

            # Create the new user id
            userCount = User.objects.values_list("id").count()
            id = "U" + str(100000 + userCount + 1)

            # Update the data with id and password
            user_data.update({'id': id})
            user_data.update({'password': password1})
            user_data.update({'role': "business"})
            business_data.update({'user': id})

            userSerializer = UserSerializer(data=user_data)
            userSerializer.is_valid(raise_exception=True)
            userSerializer.save()

            hotelOwnerSerializer = HotelOwnerSerializer(data=business_data)
            hotelOwnerSerializer.is_valid(raise_exception=True)
            hotelOwnerSerializer.save()

            return Response(
                {"error": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {"error": f"An error occured: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    else:
        return Response(
            {"error": f"Password does not match"},
            status=status.HTTP_406_NOT_ACCEPTABLE
        )
