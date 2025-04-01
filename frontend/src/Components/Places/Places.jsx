import { Button } from "flowbite-react";
import PlacesCard from "./PlacesCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Places = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/popular_city/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto my-5 md:px-2 lg:px-24 sm:px-2">
      <div className="container md:px-2 lg:px-24 sm:px-2">
        <div className="flex flex-column justify-between items-center py-2">
          <h2 className="py-4 text-3xl font-medium leading-none tracking-tight text-gray-700 md:text-3xl md:font-bold dark:text-white">
            Destination Gallery
            <hr className="w-[10vw] border-5 border-blue-400 h-[12px]"></hr>
          </h2>
          <h6 className="w-11/12 md:w-4/6 lg:w-3/6 text-center text-gray-400">
            Embark on a Digital Odyssey at Travel Hunt! Explore a world of
            information, inspiration, and discovery. Your journey to curated
            content begins here.
          </h6>
        </div>
      </div>
      <div className="container mt-4">
        {data.cities ? (
          <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-4 gap-4">
            {data.cities.map((data, i) => (
              <div key={i}>
                <PlacesCard data={data} />
              </div>
            ))}
          </div>
        ) : (
          <>data not found</>
        )}
        <div className="mt-6 flex justify-center">
          <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-8 w-24 rounded-2xl bg-sky-800 p-2 flex justify-center items-center font-light">
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
            <a href="alldestiny" className="z-10">
              See more
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Places;