import {
  useLocation,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import NavBar from "../NavBar/Navbar";
import AllPlacesHero from "./AllPlacesHero";
import FooterCon from "../Footer/FooterCon";
import axios from "axios";
import { useEffect, useState } from "react";
import TripSelect from "../SearchResults/TripSelect";

const AllPlaces = (props) => {
  // const { state } = props.location;
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get query string parameter from the URL
  const locationID = new URLSearchParams(location.search).get("l");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_location/" + locationID)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showModel = () => {
    document.getElementById("select-modal").style = "display:block";
  };
  const closeModel = () => {
    document.getElementById("select-modal").style = "display:hidden";
  };

  let { state } = useLocation();
  // console.log(state.data);
  return (
    <>
      <NavBar />
      <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0  overflow-hidden ">
                <div
                  className="relative mb-6 lg:mb-10"
                  style={{ height: "450px" }}
                >
                  <img
                    src={data["image1"]}
                    alt=""
                    className="object-contain w-full h-full "
                  />
                </div>
                <div className="flex-wrap hidden md:flex ">
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      href="#"
                      className="block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300 "
                    >
                      <img
                        src={data["image2"]}
                        alt=""
                        className="object-cover w-full lg:h-32"
                      />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      href="#"
                      className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                    >
                      <img
                        src={data["image3"]}
                        alt=""
                        className="object-cover w-full lg:h-32"
                      />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      href="/places"
                      className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                    >
                      <img
                        src={data["image1"]}
                        alt=""
                        className="object-cover w-full lg:h-32"
                      />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      href="#"
                      className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                    >
                      <img
                        src={data["image1"]}
                        alt=""
                        className="object-cover w-full lg:h-32"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-blue-900 dark:text-rose-200">
                    {data["category"]}
                  </span>
                  <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                    {data["name"]}
                  </h2>

                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {data["description"]}
                  </p>
                </div>
                <div className="grid grid-cols-1">
                  <div>
                    <h1 className="text-2xl font-bold py-3">
                      <span>Location Deatils of </span>
                      <span className="text-emerald-500">{data["name"]}</span>
                    </h1>
                    <div>
                      <div className="grid grid-cols-2 container">
                        <h2 className="py-3 font-bold text-sm">Located In</h2>
                        <h6 className="py-3 text-sm">
                          {data["city_name"] + ", " + data["country_name"]}
                        </h6>
                      </div>
                      <div className="grid grid-cols-2 container">
                        <h2 className="py-3 font-bold text-sm ">Latitude</h2>
                        <h6 className="py-3 text-sm">{data["latitude"]}</h6>
                      </div>
                      <div className="grid grid-cols-2 container">
                        <h2 className="py-3 font-bold text-sm ">Longitude</h2>
                        <h6 className="py-3 text-sm">{data["longitude"]}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <TripSelect />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model */}
      <center>
        <div
          id="select-modal"
          tabindex="-1"
          aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Select your Trip
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    closeModel();
                  }}
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="select-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="p-4 md:p-5">
                <ul class="space-y-4 mb-4">
                  <li>
                    <input
                      type="radio"
                      id="job-1"
                      name="job"
                      value="job-1"
                      class="hidden peer"
                      required
                    />
                    <label
                      for="job-1"
                      class="inline-flex items-center justify-between w-full p-2 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      <div class="block">
                        <div class="w-full text-lg font-semibold">Tour 01</div>
                      </div>
                      <svg
                        class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                  </li>
                </ul>
                <div className="flex flex-row gap-2">
                  <button class="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save Tour
                  </button>
                  <a
                    href="planner"
                    class="text-white inline-flex w-full justify-center bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    New Tour
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
      <FooterCon />
    </>
  );
};

export default AllPlaces;