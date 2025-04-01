import { Button } from "flowbite-react";
import { useState } from "react";

const PlacesCard = (data) => {
  const [favState, setFavState] = useState(true);

  const changeFavState = () => {
    setFavState(!favState);
  };
  return (
    <a href={"/city?c=" + data.data["city_id"]}>
      <div class="hover:scale-105 duration-500 max-h-[200px] md:h-full max-w-full relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <img
          class="rounded-lg h-full w-full"
          src={data.data["image2"]}
          alt=""
        />
        <div className="absolute top-1 right-0">
          {favState ? (
            <Button
              className="bg-transparent border-0 w-min px-0 py-0"
              onClick={changeFavState}
            >
              <svg
                className="w-4 h-4 text-white dark:text-white hover:shadow-lg"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 19"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                />
              </svg>
            </Button>
          ) : (
            <Button
              className="bg-transparent border-0 w-min px-0 py-0"
              onClick={changeFavState}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white shadow-lg"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 20 18"
              >
                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
              </svg>
            </Button>
          )}
        </div>
        <div class="absolute bottom-0 p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-white text-ellipsis">
            {data.data["city_name"]}
          </h5>
          <p className="text-white">
            <small>this is some text</small>
          </p>
        </div>
      </div>
    </a>
  );
};

export default PlacesCard;
