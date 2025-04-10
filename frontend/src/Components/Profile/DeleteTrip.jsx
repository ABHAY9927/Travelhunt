import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripID = new URLSearchParams(location.search).get("t");

  useEffect(() => {
    if (!tripID) {
      toast.error("Trip ID not found");
      navigate("/profile");
      return;
    }

    const deleteTrip = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Session expired. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("trip_id", tripID);

        const res = await axios.post("http://localhost:8000/api/delete_trip", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.msg === "success") {
          toast.success("Trip deleted successfully");
          navigate("/profile", { replace: true });
        } else {
          toast.error(res.data.msg || "Delete failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while deleting");
      }
    };

    deleteTrip();
  }, [tripID, navigate]);

  return null;
};

export default DeleteTrip;
