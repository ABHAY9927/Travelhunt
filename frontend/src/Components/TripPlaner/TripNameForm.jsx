import React, { useState } from "react";

const TripNameForm = ({ tripCallback }) => {
  const [tripName, setTripName] = useState("");

  const handleChange = (e) => {
    setTripName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the tripData state in the parent component
    tripCallback({ data: tripName, progress: 1 });
    // Update progress
  };

  return (
    <div className="container mx-auto mt-8 w-[100vw]">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white">
        <h4 className="text-xl font-extralight mb-4 text-center">
          Embark on Your Journey: Inspire, Create, Name Your Adventure!
        </h4>
        <div className="mb-4">
          <input
            type="text"
            id="tripName"
            name="tripName"
            value={tripName}
            onChange={handleChange}
            placeholder="Enter trip name"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#427d9d] text-white p-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default TripNameForm;
