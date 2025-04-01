import NavBar from "../NavBar/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "flowbite-react";
import { toast } from "react-toastify";
import FooterCon from "../Footer/FooterCon";
import TripSelect from "./TripSelect";

const Hotel = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get query string parameter from the URL
  const hotelID = new URLSearchParams(location.search).get("l");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_hotel/" + hotelID)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (data !== undefined) {
    return (
      <div>
        <NavBar />
        <div className="bg-red-100 relative h-1/3 md:h-[25vh] lg:h-[25vh] top-5 pl-5 pb-5">
          <h1 className="text-5xl font-extrabold pt-24">
            <span>Explore </span>
            <span className="text-emerald-500">{data["name"]}</span>
          </h1>
        </div>

        <div className="relative h-1/3 md:h-[10vh] lg:h-[10vh] top-5 pl-5 py-4 pr-5">
          <TripSelect></TripSelect>
        </div>

        <div className="py-5">
          <h1 className="text-4xl font-bold text-center">
            <span>Few Snaps from </span>
            <span className="text-emerald-500">{data["name"]}</span>
          </h1>
          <div className="bg-red-100 relative h-screen md:h-[80vh] lg:h-[80vh] my-5">
            <div className="h-screen md:h-full lg:h-full">
              <Carousel
                indicators={false}
                slideInterval={5000}
                className="rounded-none"
              >
                <img
                  src={data["image1"]}
                  alt="..."
                  className="object-cover h-screen "
                />
                <img
                  src={data["image2"]}
                  alt="..."
                  className="object-cover h-screen"
                />
                <img
                  src={data["image3"]}
                  alt="..."
                  className="object-cover h-screen"
                />
              </Carousel>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 pl-5">
          <div>
            <h1 className="text-2xl font-bold py-3 pt-5 text-center">
              <span>About </span>
              <span className="text-emerald-500">{data["name"]}</span>
            </h1>
            <span className="w-6/12">{data["description"]}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 pl-5">
          <div>
            <h1 className="text-2xl font-bold py-3 text-center">
              <span>Deatils of </span>
              <span className="text-emerald-500">{data["name"]}</span>
            </h1>
            <div className="grid grid-cols-1 container">
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Wifi </h5>
                <h5 className="text-sm">{data["wifi"]}</h5>
              </div>
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Parking </h5>
                <h5 className="text-sm">{data["parking"]}</h5>
              </div>
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Pool </h5>
                <h5 className="text-sm">{data["pool"]}</h5>
              </div>
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Restaurant </h5>
                <h5 className="text-sm">{data["restaurant"]}</h5>
              </div>
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Pub </h5>
                <h5 className="text-sm">{data["pub"]}</h5>
              </div>
              <div className="grid grid-cols-2 container gap-3">
                <h5 className="text-sm font-bold text-right">Transport </h5>
                <h5 className="text-sm">{data["transport"]}</h5>
              </div>
            </div>
          </div>
        </div>
        <FooterCon></FooterCon>
      </div>
    );
  } else {
    toast.error("No Data Available");
    navigate("/planner", { replace: true });
  }
};

export default Hotel;
