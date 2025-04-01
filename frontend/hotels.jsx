import React from "react";
import { useParams } from "react-router-dom";

const hotels = [
  { id: 1, name: "Hotel Taj", image: "/images/tajhotel.jpg", description: "Luxurious hotel with sea view." },
  { id: 2, name: "The Oberoi", image: "/images/oberoi.jpg", description: "A 5-star hotel with modern amenities." },
  { id: 3, name: "Burz-al-arab", image: "/images/burj.avif", description: "Royal experience in the city center." },
  { id: 4, name: "Radisson Blu", image: "/images/blu.jpg", description: "Premium stay with comfort & elegance." },
];

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.id === parseInt(id));

  if (!hotel) {
    return <h2 className="text-center text-2xl font-bold">Hotel Not Found</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-lg" />
      <p className="mt-4 text-lg text-center">{hotel.description}</p>
    </div>
  );
};

export default HotelDetails;