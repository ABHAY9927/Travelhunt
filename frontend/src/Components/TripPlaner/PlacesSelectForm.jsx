import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceSelectForm = ({ tripCallback, selectedLocations }) => {
  const [tripname, setTripname] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripname.trim()) {
      toast.error("Please enter a trip name.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token"); 
      if (!token) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/save_trip/",
        {
          tripname: tripname.trim(),
          locations: selectedLocations?.length > 0 ? selectedLocations : [],
          start: startDate,
          end: endDate,
          is_complete: isComplete,
        },
      
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200 || response.status === 201) { 
        toast.success("Trip Saved Successfully!");
        navigate("/trip_saved");
      } else {
        toast.error("Trip not saved successfully");
        navigate("/planner");

      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="m-auto left-0 right-0 dark:bg-slate-800 border-0 px-3 py-3 rounded">
      <h4 className="text-xl font-extralight mb-4 text-center">
        Navigate Your Next Adventure: Discover, Plan, Explore with Ease!
      </h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Trip Name"
          value={tripname}
          onChange={(e) => setTripname(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  required
  className="w-full p-2 border rounded"
  placeholder="Start Date"
/>

<input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  required
  className="w-full p-2 border rounded"
  placeholder="End Date"
/>

<label className="flex items-center space-x-2">
  <input
    type="checkbox"
    checked={isComplete}
    onChange={(e) => setIsComplete(e.target.checked)}
  />
  <span className="text-white">Mark as Completed</span>
</label>

        <button
          type="submit"
          className="w-full bg-[#427d9d] text-white p-2 rounded hover:bg-blue-600"
        >
          Save Tour
        </button>
      </form>
    </div>
  );
};

export default PlaceSelectForm;
