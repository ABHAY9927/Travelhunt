import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteTrip = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tripID = new URLSearchParams(location.search).get("t");
    console.log(tripID)

    useEffect(() => {
        (async () => {

            let formData = new FormData();
            formData.append("trip_id", tripID)
        
            await axios
              .post("http://localhost:8000/api/delete_trip", formData)
              .then((response) => {
                if (response.data.msg === "success") {
                  toast.success("Deleted successfully")
                  navigate("/profile", {replace: true})
                   //console.log("delete success");
                }
              })
              .catch(() => {
                toast.error("An error occured");
              });
          })();
    })
}

export default DeleteTrip;