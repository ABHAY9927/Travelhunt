import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import { useEffect, useState } from "react";
import FooterCon from "../Footer/FooterCon";

const HotelDetails = () => {
  const [hotelData, setHotelData] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) {
      setHotelData(state.data);
      console.log("Hotel Data:", state.data); 
    }
  }, [state]);

  const showModal = () => {
    document.getElementById("select-modal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("select-modal").style.display = "none";
  };

  const handleAddToTrip = () => {
    if (!selectedTrip) {
      alert("Please select a trip first!");
      return;
    }
  
    if (!hotelData || !hotelData.name) {
      alert("Error: Hotel data is not available. Please try again!");
      return;
    }
  
    alert(`Added ${hotelData.name} to your trip: ${selectedTrip}`);
    closeModal();
  };

  // ✅ Image ka sahi path handle karna
  const getImageSrc = () => {
    if (!hotelData?.image1) return "/images/plaza.jpg"; // Default image
    if (hotelData.image1.startsWith("http")) return hotelData.image1; // Agar full URL API se mila ho
    return `/images/${hotelData.image1}`; // Agar sirf image ka naam mila ho
  };

  return (
    <div>
      <NavBar />
      <div className="flex align-items-center w-100">
        <div className="py-3 flex flex-column container mt-[15vh] border-b-2 w-50">
          <h3 className="text-2xl dark:text-white text-gray-600 w-50 mb-2">
            {hotelData ? hotelData.name : "HOTEL"}
          </h3>

          {/* Rating Section */}
          <div className="flex items-center">
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-300 me-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
          </div>

          {/* Address & Add to Trip */}
          <span className="text-sm font-light mt-2 flex align-items-center justify-between">
            📍 31 St Thomas Street, London SE1 9QU England
            <button
              type="button"
              onClick={showModal}
              className="ml-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Add to Trip
            </button>
          </span>
        </div>
      </div>

      {/* Hotel Images */}
      <div className="w-full px-4 flex align-items-center justify-content-center">
        <div className="relative mb-6 lg:mb-10" style={{ height: "450px" }}>
          <img 
            src={getImageSrc()} 
            alt="Hotel" 
            className="object-cover w-full h-full" 
          />
        </div>
      </div>

      {/* Modal for selecting a trip */}
      <div id="select-modal" className="hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-md w-96">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Select your Trip</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              ✖
            </button>
          </div>

          <div className="p-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="trip"
                value="Tour 01"
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="mr-2"
              />
              Tour 01
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                name="trip"
                value="Tour 02"
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="mr-2"
              />
              Tour 02
            </label>
          </div>

          <div className="flex gap-2">
            <button onClick={handleAddToTrip} className="w-full bg-blue-700 text-white py-2 rounded-lg">
            <a href="/trip_saved" className="z-10">
              Save Tour
              </a>
            </button>
            <button className="w-full bg-gray-500 text-white py-2 rounded-lg">
            <a href="/planner" className="z-10">
              New Tour
              </a>
            </button>
          </div>
        </div>
      </div>

      <FooterCon />
    </div>
  );
};

export default HotelDetails;
