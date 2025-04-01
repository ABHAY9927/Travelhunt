import { Progress } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/Navbar";
import TripNameForm from "../Components/TripPlaner/TripNameForm";
import DatePickerComponent from "../Components/TripPlaner/DatePickerComponent";
import PlaceSelectForm from "../Components/TripPlaner/PlacesSelectForm";
import axios from "axios";
import { toast } from "react-toastify";

const TripBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [slidestate, setSlideState] = useState(0);
  let [progess, setProgress] = useState(0);

  const locationID = new URLSearchParams(location.search).get("l");

  const [tripdata, setTripdata] = useState({
    tripname: "",
    stratdate: "",
    enddate: "",
    last_location: locationID,
  });

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setTripdata({
  //     ...tripdata,
  //     [e.target.name]: value,
  //   });
  // };

  const updateTripData = async (data) => {
    //console.log(data.progress);
    switch (data.progress) {
      case 1:
        setTripdata((prevData) => ({
          ...prevData,
          tripname: data.data,
        }));
        break;
      case 2:
        setTripdata((prevData) => ({
          ...prevData,
          stratdate: data.data["startdate"],
        }));
        setTripdata((prevData) => ({
          ...prevData,
          enddate: data.data["enddate"],
        }));
        break;
      case 3:
        setTripdata((prevData) => ({
          ...prevData,
          places: data.data,
        }));
        break;
    }

    calProgress(data.progress);
    // console.log(tripdata);

    if (
      tripdata["tripname"] !== "" &&
      tripdata["startdate"] !== "" &&
      tripdata["enddate"] !== ""
    ) {
      await axios
        .post("http://localhost:8000/save_trip/", tripdata)
        .then((response) => {
          if (response.data["error"] === "OK") {
            const locationID = response.data["last_location"];

            toast.success("Trip Saved Successfully");
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const calProgress = (state) => {
    let progress = (state / 3) * 100;
    setSlideState(state);
    setProgress(progress);
  };
  const tripCallback = (progress) => {
    updateTripData(progress);
  };

  const BottonProgressBar = () => {
    return (
      <div className="fixed bottom-0 h-[10vh] w-100 shadow-lg bg-white">
        {/* <div className="w-75 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[8px]"></div>
         */}
        <Progress progress={progess} size="sm" />
        <Pagination />
        {/* bottom */}
      </div>
    );
  };

  const Pagination = () => {
    return (
      <div class="fixed bottom-0 left-0 z-50  w-full h-16  px-8 bg-white border-t border-gray-200  dark:bg-gray-700 dark:border-gray-600">
        <div class="flex items-center justify-center mx-auto my-2">
          <button
            onClick={() => {
              calProgress(0);
            }}
            style={{
              backgroundColor: slidestate >= 0 ? "#427d9d" : "",
              color: "white",
            }}
            data-tooltip-target="tooltip-microphone"
            type="button"
            className="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 me-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div className="px-2">1</div>
            <span class="sr-only">Content 1</span>
          </button>

          <button
            onClick={() => {
              calProgress(1);
            }}
            style={{
              backgroundColor: slidestate >= 1 ? "#427d9d" : "",
              color: "white",
            }}
            data-tooltip-target="tooltip-camera"
            type="button"
            class="p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 me-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div className="px-2">2</div>
            <span class="sr-only">Hide camera</span>
          </button>

          <button
            onClick={() => {
              calProgress(2);
            }}
            style={{
              backgroundColor: slidestate >= 2 ? "#427d9d" : "",
              color: "white",
            }}
            data-tooltip-target="tooltip-feedback"
            type="button"
            class="p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 me-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div className="px-2">3</div>
            <span class="sr-only">Share feedback</span>
          </button>
        </div>
      </div>
    );
  };

  const slideList = [
    <FirstSlide tripCallback={tripCallback} />,
    <SecondSlide tripCallback={tripCallback} />,
    <ThirdSlide tripCallback={tripCallback} />,
  ];

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <NavBar />

      <div>{slideList[slidestate]}</div>
      <BottonProgressBar />
    </div>
  );
};

const FirstSlide = ({ tripCallback }) => {
  return (
    <div>
      <TripNameForm tripCallback={tripCallback} />
    </div>
  );
};
const SecondSlide = ({ tripCallback }) => {
  return (
    <div>
      <DatePickerComponent tripCallback={tripCallback} />
    </div>
  );
};
const ThirdSlide = ({ tripCallback }) => {
  return (
    <div>
      <PlaceSelectForm tripCallback={tripCallback} />
    </div>
  );
};

export default TripBuilder;
