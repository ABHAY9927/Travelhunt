import React from "react";
import NavBar from "../NavBar/Navbar";
import FooterCon from "../Footer/FooterCon";

function Tripinfo() {
  const tripData = {
    tripName: "Summer Vacation 2023",
    location: "Paris, France",
    country: "France",
    town: "Paris",
    visitPlaces: ["Eiffel Tower", "Louvre Museum", "Montmartre"],
    startDate: "2023-07-01",
    endDate: "2023-07-10",
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Update Trip Information
        </h1>
        <section className="w-full">
          <div className="container mx-auto py-5 w-25">
            <form class="">
              <div>
                <label
                  for="small-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Small input
                </label>
                <input
                  type="text"
                  id="small-input"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Small input
                </label>
                <input
                  type="text"
                  id="small-input"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Small input
                </label>
                <input
                  type="text"
                  id="small-input"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </section>
      </div>
      <FooterCon />
    </>
  );
}

export default Tripinfo;
