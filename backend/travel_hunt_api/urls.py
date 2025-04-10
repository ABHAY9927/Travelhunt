from django.urls import path
from . import views_general
from . import views_user
from . import views_admin

urlpatterns = [
    path('check_city/<str:city_name>',
         views_general.check_city, name="check_city"),

    path('popular_city/',
         views_general.get_popular_city, name="popular_city"),

    path('get_city/<str:city_id>',
         views_general.get_city, name='get_city'),

    path('get_location/<str:location_id>',
         views_general.get_location, name='get_location'),

    path('get_hotel/<str:hotel_id>',
         views_general.get_hotel, name='get_hotel'),

    path('login',
         views_general.LoginView.as_view(), name='login'),

    path('logout', views_general.LogoutView.as_view(), name="logout"),

    path('validate_user_signup',
         views_user.validate_signup, name='validate_user_signup'),

    path('validate_admin_signup',
         views_admin.validate_signup, name='validate_admin_signup'),

    path('save_trip/', views_user.save_trip, name="save_trip"),

    path('get_previous_trips', views_user.get_previous_trips,
         name="get_previous_trips"),

    path('save_to_trip', views_user.save_to_trip,
         name="save_to_trip"),

    path('delete_trip', views_user.delete_trip,
         name="delete_trip"),

    path('get_user_detials', views_user.get_user_detials,
         name="get_user_detials"),

    path('get_hotels', views_general.get_hotels,
         name="get_hotels")
]