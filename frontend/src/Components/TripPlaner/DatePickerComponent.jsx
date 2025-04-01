import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

export default function DatePickerComponent({ tripCallback }) {
  const [timedata, setTimeData] = useState({
    startdate: "",
    enddate: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setTimeData({
      ...timedata,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    // Assuming you have selected start and end dates in state, update the tripData
    tripCallback({ data: timedata, progress: 2 });
  };
  return (
    <div className="container mx-auto mt-8 w-[100vw]">
      <form className="max-w-md mx-auto p-4 bg-white" onSubmit={handleSubmit}>
        <h4 className="text-xl font-extralight mb-4 text-center">
          Choose the Dates That Define Your Adventure!
        </h4>
        <div date-rangepicker className="flex items-center">
          <div className="relative">
            <input
              name="startdate"
              type="date"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <input
              name="enddate"
              type="date"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date end"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#427d9d] text-white p-2 rounded hover:bg-blue-600 mt-3"
          // onClick={() => {
          //   tripCallback(2);
          // }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
