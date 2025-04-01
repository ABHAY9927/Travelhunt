import React from "react";
import { useNavigate } from "react-router-dom";

const TripSaved = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-green-600">Trip Saved Successfully! 🎉</h2>
      <p className="text-lg mt-2">Your trip has been saved successfully.</p>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/profile")}
      >
        Go to Profile
      </button>
    </div>
  );
};

export default TripSaved;
