import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const TripSelect = ({ isLoggedIn }) => {
  const [loggedIn, setLoginStatus] = useState("");
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get query string parameter from the URL to redirect user to location after saving the trip
  const locationID = new URLSearchParams(location.search).get("l");

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      (async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:8000/api/login",
            { headers: { "Content-Type": "application/json" } },
            { refresh_token: localStorage.getItem("refresh_token") },
            { withCredentials: true }
          );
          // console.log(data);
          if (data.message === "success") {
            setLoginStatus(true);
            navigate("/Components/Places/AllPlacesHero", { replace: true });

          } else {
            setLoginStatus(false);
          }
        } catch {
          console.log("Unauthorized");
          setLoginStatus(false);
        }
      })();
    } else {
      setLoginStatus(false);
      toast.error("Session Expired. Please login again");
      navigate("/Places", { replace: true });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .post("http://localhost:8000/api/get_previous_trips")
        .then((response) => {
          if (response.data !== null) {
            setTrips(response.data);
          } else {
            toast.error("Sesion Expired. Login again.");
            navigate("/Places", { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Sesion Expired. Login again.");
          navigate("/login", { replace: true });
        });
    })();
  }, []);

  //console.log(trips);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get("trip_name") === "new") {
      // Trip has to be saved first
      navigate("/planner?l=" + locationID, { replace: true });
    } else {
      // Trip is already saved

      formData.append("location", locationID);
      await axios
        .post("http://localhost:8000/api/save_to_trip", formData)
        .then((response) => {
          if (response.data.msg === "ok") {
            toast.success("Location added to trip succesfully");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  if (loggedIn) {
    if (trips !== undefined) {
      return (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="container grid grid-cols-2 gap-3 w-fit">
              <div>
                <select name="trip_name" className="w-fit rounded-lg">
                  {trips?.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.name}
                    </option>
                  ))}
                  <option value="new">Create New Trip</option>
                </select>
              </div>
              <div>
                <input
                  type="submit"
                  name="submit"
                  value="Add to Trip"
                  className="bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </form>
        </div>
      );
    }
  } else {
    return (
      <div>
        <a
          href="/trip_saved"
          className="absolute bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to Trip
        </a>
      </div>
    );
  }
};

export default TripSelect;
