import React from "react";
import { useNavigate } from "react-router-dom";

const AllHotels = () => {
  const navigate = useNavigate();

  const allHotels = [
    { id: 1, name: "Taj Hotel, Mumbai", image: "/images/tajhotel.jpg", description: "Luxury hotel in Mumbai with sea view." },
    { id: 2, name: "Marriott, New York", image: "/images/marriott.jpg", description: "Five-star hotel in the heart of New York." },
    { id: 3, name: "Burj Al Arab, Dubai", image: "/images/burj.avif", description: "Iconic luxury hotel in Dubai." },
    { id: 4, name: "The Ritz, Paris", image: "/images/ritz.webp", description: "Historic luxury hotel in Paris." },
    { id: 5, name: "The Oberoi, India", image: "/images/oberoi.jpg", description: "Premium Indian hospitality with world-class service." },
    { id: 6, name: "Shangri-La, London", image: "/images/shangri.jpg", description: "Luxury hotel with stunning views of London." },
    { id: 7, name: "Hilton, Sydney", image: "/images/hilton.jpg", description: "Elegant hotel in the heart of Sydney." },
    { id: 8, name: "Plaza Hotel, New York", image: "/images/plaza.jpg", description: "Iconic hotel in New York with classic luxury." },
    { id: 9, name: "Four Seasons, Tokyo", image: "/images/four.jpg", description: "Modern luxury in Tokyo with excellent hospitality." },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* 🔹 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-center mt-4">All Hotels</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {allHotels.map((hotel) => (
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
    </div>
  );
};

export default AllHotels;
