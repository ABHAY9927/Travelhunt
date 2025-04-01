import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlaceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    const places = [
        {
            id: 1,
            title: "Disneyland, USA",
            image: "/images/disney.jpg",
            description: "A magical amusement park in California...",
            location: "Anaheim, California, USA",
            best_time: "March - May, September - November",
            activities: ["Rides", "Shows", "Parades", "Dining"],
            hotels: ["Disneyland Hotel", "Paradise Pier Hotel", "Grand Californian Hotel"],
            nearby_attractions: ["Universal Studios", "Hollywood Walk of Fame", "Santa Monica Beach"]
        },
        {
            id: 2,
            title: "Goa, India",
            image: "/images/Goa.jpg",
            description: "Famous for its beaches and nightlife...",
            location: "Goa, India",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn Goa"],
            nearby_attractions: ["Dudhsagar Falls", "Fort Aguada", "Baga Beach"]
        },
        {
            id: 3,
            title: "Grand Canyon, USA",
            image: "/images/grand.jpg",
            description: "The Grand Canyon is famous for its immense scale...",
            location: "Grand Canyon, USA",
            best_time: "October - March",
            activities: ["Hiking", "Rafting", "Camping"],
            hotels: ["Bright Angel Lodge", "Yavapai Lodge", "El Tovar Hotel"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]
        },
        {
            id: 4,
            title: "Manali, India",
            image: "/images/manali.jpg",
            description: "Famous for its beaches and nightlife. Manali is synonymous streams and birdsong, forests and orchards and grandees of snow-capped mountains. Manali is the real starting point of an ancient trade route which crosses the Rohtang and Baralacha passes, and runs via Lahul and Ladakh to Kashmir while divergent road connects it with Spiti. ",
            location: "Manali, India",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn Manali"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]

        },
        {
            id: 5,
            title: "Leh-Laddakh, India",
            image: "/images/leh.jpg",
            description: "Famous for its beaches and nightlife. The Best time to visit Ladakh is during the summer season from the month of April to July during this time Ladakh temperature is between 15 to 30 Degree Celsius. Ladakh is known for its extremely low temperatures almost all through the year.",
            location: "Leh-Laddakh, India",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn laddakh"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]

        },
        {
            id: 6,
            title: "Everest Base Camp, Nepal",
            image: "/images/everest.webp",
            description: "Famous for its beaches and nightlife. Mount Everest, known locally as Sagarmatha or Qomolangma, is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point.",
            location: "Nepal",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn Nepal"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]

        },
        {
            id: 7,
            title: "Santorini, Greece",
            image: "/images/santorini.jpg",
            description: "Famous for its beaches and nightlife. Apart from the beautiful landscape, the island is also famous for its beaches, each colored differently because of its volcanic history. The black sand beaches, such as those in Kamari and Perissa, are a result of the island's volcanic eruptions, with their color creating a contrast with the turquoise waters.",
            location: "Santorini, Greece",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn Greece"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]

        },
        {
            id: 8,
            title: "Bali , Indonesia",
            image: "/images/bali.jpg",
            description: "Famous for its beaches and nightlife. Bali is famous because of its slightly exotic location compared to much of the Western nations and because it has a welcoming, kind culture and some of the best beaches, surfing, temples, rice terraces, etc. on Earth.",
            location: "Bali, Indonesia",
            best_time: "October - March",
            activities: ["Water Sports", "Nightlife", "Beach Parties"],
            hotels: ["Taj Exotica", "Leela Goa", "Holiday Inn Indonesia"],
            nearby_attractions: ["Horseshoe Bend", "Antelope Canyon", "Hoover Dam"]

        
        }
        // ... Add more places
    ];

    const place = places.find((p) => p.id === parseInt(id));

    if (!place) {
        return <h2 className="text-center text-red-500">Place Not Found!</h2>;
    }

    // 🔹 Save to Wishlist
    const handleSave = () => {
        setIsSaved(!isSaved);
        localStorage.setItem(`saved_place_${id}`, JSON.stringify(place));
    };

    // 🔹 Share Place Function
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard! Share it with your friends.");
    };

    return (
        <div className="container mx-auto text-center mt-6">
            {/* 🔹 Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
                ← Back
            </button>

            <h2 className="text-4xl font-bold mt-12">{place.title}</h2>
            <img src={place.image} alt={place.title} className="w-2/3 mx-auto my-4 rounded-lg shadow-md" />
            <p className="text-lg">{place.description}</p>

            {/* 🔹 Additional Information */}
            <div className="mt-6 text-left mx-auto w-2/3">
                <p><strong>📍 Location:</strong> {place.location}</p>
                <p><strong>🗓 Best Time to Visit:</strong> {place.best_time}</p>
                <p><strong>🎯 Activities:</strong> {place.activities.join(", ")}</p>
                <p><strong>🏨 Recommended Hotels:</strong> {place.hotels.join(", ")}</p>
            </div>

            {/* 🔹 Buttons Section */}
            <div className="mt-6 flex justify-center gap-4">
                {/* Save to Wishlist */}
                <button
                    onClick={handleSave}
                    className={`px-6 py-3 rounded-lg text-white ${isSaved ? "bg-green-600" : "bg-blue-600"} hover:opacity-80 transition`}
                >
                    {isSaved ? "Saved ✅" : "Save to Wishlist"}
                </button>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Share Place 🔗
                </button>

                {/* Book a Hotel */}
                <a
                    href="https://www.booking.com" 
                    target="_blank"
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-800 transition"
                >
                    Book a Hotel 🏨
                </a>
            </div>

            {/* 🔹 Nearby Attractions */}
            <div className="mt-8 text-left mx-auto w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">🎡 Nearby Attractions</h3>
                <ul className="list-disc ml-6">
                    {place.nearby_attractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlaceDetails;
