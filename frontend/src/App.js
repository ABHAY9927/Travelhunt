import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Toasts/Layout";
import Home from "./Components/HomePage/Home";
import TripBuilder from "./Pages/TripBuilder";
import TravllerHome from "./Components/HomePage/TravellerHome";
import BusinessHome from "./Components/HomePage/BusinessHome";
import Login from "./Components/Login/Login";
import AdminLogin from "./Components/Login/AdminLogin";
import UserSignup from "./Components/Signup/UserSignup";
import AdminSignup from "./Components/Signup/AdminSignup";
import { Logout } from "./Components/Login/Logout";
import AllPlaces from "./Components/Places/AllPlaces";
import PlaceDetails from "./Components/Places/PlaceDetails"
import City from "./Components/SearchResults/City";
import DestinationsPage from "./Components/Places/DestinationsPage";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import AllPlacesHero from "./Components/Places/AllPlacesHero";
import Profile from "./Components/Profile/Profile";
import Hotels from "./Components/Places/Hotels";
import HotelDetails from "./Components/Places/HotelDetails";
import Location from "./Components/Places/AllPlaces";
import Tripinfo from "./Components/Profile/Tripinfo";
import DeleteTrip from "./Components/Profile/DeleteTrip";
import Hotel from "./Components/SearchResults/Hotel";
import AllHotels from "./Components/Places/AllHotels";
import TripSelect from "./Components/SearchResults/TripSelect"
import TripSaved from "./Components/Profile/TripSaved";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import { Navigate } from "react-router-dom";
import AllDestiny from "./Components/Places/AllDestiny";

const PrivateRoute =({children}) => {const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to = "/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
          <Route path="/location" element={<Location />} />
          <Route path="/hotel_details" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/traveller_home" element={<TravllerHome />} />
          <Route path="/business_home" element={<BusinessHome />} />
          <Route path="/allplaceshero" element={<AllPlacesHero />} />
          <Route path="/planner" element={<TripBuilder />} />
          <Route path="/desinations" element={<DestinationsPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/allplaces" element={<PrivateRoute><AllPlaces /></PrivateRoute>} />
          <Route path="/place/:id" element={<PlaceDetails />} /> {/* Individual place details */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/tripinfo" element={<Tripinfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trip_info" element={<Tripinfo />} />
          <Route path="/allhotels" element={<AllHotels />} />
          <Route path="/delete_trip" element={<DeleteTrip />} />
          <Route path="/trip_select" element={<TripSelect />} />
          <Route path="/trip_saved" element={<TripSaved />} />
          <Route path="/alldestiny" element={<AllDestiny />} />


        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
