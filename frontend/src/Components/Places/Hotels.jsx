import React from "react";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const navigate = useNavigate(); // Navigation Hook

  const hotels = [
    { id: 1, name: "Taj Hotel, Mumbai", image: "/images/tajhotel.jpg", description: "Luxury hotel in Mumbai with sea view." },
    { id: 2, name: "Marriott, New York", image: "/images/marriott.jpg", description: "Five-star hotel in the heart of New York." },
    { id: 3, name: "The Ritz, Paris", image: "/images/ritz.webp", description: "Iconic luxury hotel in Dubai." },
    { id: 4, name: "Burj Al Arab, Dubai", image: "/images/burj.avif", description: "Iconic luxury hotel in Dubai." },
    { id: 5, name: "The Oberoi, India", image: "/images/oberoi.jpg", description: "Iconic luxury hotel in Dubai." },
    { id: 6, name: "Plaza Hotel, New York", image: "/images/plaza.jpg", description: "Iconic luxury hotel in Dubai." },

  ];

  const handleSeeMore = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    setTimeout(() => {
      navigate("/allhotels"); // Navigate to All Hotels Page
    }, 500);
  };

  return (
    <div className="container mx-auto">
      {/* 🔹 Back Button at Top Left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-center mt-12">Top Hotels</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="relative cursor-pointer"
            onClick={() => navigate(`/hotel/${hotel.id}`, { state: hotel })}
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-center mt-2 font-semibold">{hotel.name}</h3>
          </div>
        ))}
      </div>

      {/* 🔹 See More Button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleSeeMore}
        >
          SEE MORE HOTELS
        </button>
      </div>
    </div>
  );
};

export default Hotels;
