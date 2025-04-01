import NavBar from "../NavBar/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

const City = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get query string parameter from the URL
  const cityID = new URLSearchParams(location.search).get("c");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_city/" + cityID)
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
        <div className="bg-red-100 relative h-screen md:h-[80vh] lg:h-[80vh]">
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

          <div className="container">
            <Card className="w-fit md:max-w-2xl lg:max-w-2xl absolute bottom-12 m-auto left-0 right-0 bg-gray-100 dark:bg-slate-800 border-0">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <div>
                  <h1 className="text-5xl font-extrabold">
                    <span>Explore </span>
                    <span className="text-emerald-500">
                      {data["city_name"]}
                    </span>
                  </h1>
                </div>
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-2">
            <a
              href="#"
              class="mt-4 ml-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                <div className="flex align-items-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: data["country_flag"] }}
                    className="p-3"
                  />
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Country Information
                  </h5>
                </div>
                <div className="container grid grid-flow-row grid-row-3 grid-col-2">
                  <div className="grid grid-cols-2 container">
                    <h2 className="py-3 mx-3 font-bold text-sm">Name</h2>
                    <h6 className="py-3 text-sm">{data["country_name"]}</h6>
                  </div>
                  <div className="grid grid-cols-2 container">
                    <h2 className="py-3 mx-3 font-bold text-sm ">Code</h2>
                    <h6 className="py-3 text-sm">{data["country_code"]}</h6>
                  </div>
                  <div className="grid grid-cols-2 container">
                    <h2 className="py-3 mx-3 font-bold text-sm ">
                      Description
                    </h2>
                    <h6 className="py-3 text-sm">
                      {data["country_description"]}
                    </h6>
                  </div>
                </div>
              </div>
            </a>

            <div>
              <h1 className="text-2xl font-bold py-3 pt-5">
                <span>About </span>
                <span>{data["city_name"]}</span>
              </h1>
              <span>{data["city_description"]}</span>
            </div>
          </div>

          <div className="flex py-2 px-2 md:flex-wrap sm:flex-wrap md:py-32">
            <div className="flex-auto mr-6 md:w-8/12 sm:w-full">
              <div>
                <h1 className="text-2xl font-bold pt-5 pb-4">
                  <span>Things to do in </span>
                  <span>{data["city_name"]}</span>
                </h1>
                <div className="container grid grid-cols-3">
                  {data?.places?.map((element, i) => {
                    return (
                      <div class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="h-[30vh]">
                          <Link
                            // to={"/location?l=" + element.location_id}
                            to={"/allplaces?l=" + element.location_id}
                            // state={{ data: element }}
                            className="flex-shrink-0"
                          >
                            <img
                              className="object-cover w-full h-full rounded-t-lg"
                              src={element.image}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div class="flex flex-col flex-grow p-5">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {element.location_name}
                          </h5>

                          <h5 class="mb-2 text-medium font-bold tracking-tight text-gray-900 dark:text-white">
                            {element.location_category}
                          </h5>

                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {element.location_desc.slice(0, 120) + "... "}
                          </p>

                          <a
                            href={"/location?l=" + element.location_id}
                            class="absolute bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Read more
                            <svg
                              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold pt-5">
                  <span>Places to stay in </span>
                  <span>{data["city_name"]}</span>
                </h1>
                <div className="container grid grid-cols-3 pt-4">
                  {data?.hotels?.map((element, i) => {
                    return (
                      <div class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="h-[30vh]">
                          <Link
                            // to={"/location?l=" + element.location_id}
                            to={"/hotel_details?l=" + element.hotel_id}
                            // state={{ data: element }}
                            className="flex-shrink-0"
                          >
                            <img
                              className="object-cover w-full h-full rounded-t-lg"
                              src={element.image1}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div class="flex flex-col flex-grow p-5">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {element.hotel_name}
                          </h5>

                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {element.hotel_desc.slice(0, 120) + "... "}
                          </p>

                          <a
                            href={"/location?l=" + element.id}
                            class="absolute bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Read more
                            <svg
                              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/", { replace: true });
  }
};

export default City;