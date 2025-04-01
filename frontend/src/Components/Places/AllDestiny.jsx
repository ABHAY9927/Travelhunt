import React from "react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    title: "Disneyland, USA",
    image: "/images/disney.jpg",
    description:
      "A magical amusement park in California featuring world-famous rides, shows, and Disney characters.",
    location: "Anaheim, California, USA",
    best_time: "March - May, September - November",
    activities: ["Rides", "Shows", "Parades", "Dining"],
    foods: ["Mickey Pretzels", "Churros", "Turkey Legs"],
  },
  {
    id: 2,
    title: "Santorini, Greece",
    image: "/images/santorini.jpg",
    description:
      "Known for its white-washed buildings, blue domes, and stunning Aegean Sea views.",
    location: "Santorini, Greece",
    best_time: "April - October",
    activities: ["Sunsets", "Beach Clubs", "Sailing", "Wine Tasting"],
    foods: ["Souvlaki", "Moussaka", "Greek Salad"],
  },
  {
    id: 3,
    title: "Bali, Indonesia",
    image: "/images/bali.jpg",
    description:
      "A tropical paradise with serene beaches, temples, and lush rice fields.",
    location: "Bali, Indonesia",
    best_time: "May - September",
    activities: ["Surfing", "Temple Visits", "Jungle Trekking"],
    foods: ["Nasi Goreng", "Satay", "Babi Guling"],
  },
  {
    id: 4,
    title: "Paris, France",
    image: "/images/paris.jpg",
    description:
      "The city of love, known for its romantic ambiance, Eiffel Tower, and exquisite cuisine.",
    location: "Paris, France",
    best_time: "April - June, September - November",
    activities: ["Sightseeing", "Museum Tours", "Fine Dining"],
    foods: ["Croissants", "Escargot", "Macarons"],
  },
  {
    id: 5,
    title: "Kyoto, Japan",
    image: "/images/japan.jpg",
    description:
      "A historic city with ancient temples, cherry blossoms, and a rich cultural heritage.",
    location: "Kyoto, Japan",
    best_time: "March - May, September - November",
    activities: ["Temple Visits", "Tea Ceremonies", "Cherry Blossom Viewing"],
    foods: ["Sushi", "Ramen", "Matcha Desserts"],
  },
];

const DestinationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Explore Destinations</h1>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="border rounded-lg shadow-md p-4 bg-white">
            {/* Clickable Image */}
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate(`/place/${destination.id}`)}
            />
            <h2 className="text-xl font-semibold mt-3">{destination.title}</h2>
            <p className="text-gray-600 mt-2">{destination.description}</p>
            <p className="mt-2"><strong>📍 Location:</strong> {destination.location}</p>
            <p><strong>🗓 Best Time:</strong> {destination.best_time}</p>
            <p><strong>🎯 Activities:</strong> {destination.activities.join(", ")}</p>

            {/* Food Section */}
            <p><strong>🍽 Famous Foods:</strong> {destination.foods.join(", ")}</p>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => navigate(`/place/${destination.id}`)}>
                View More
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Add to Wishlist
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
