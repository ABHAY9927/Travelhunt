import { Button, Card, Carousel, TextInput } from "flowbite-react";
import "../Hero/hero.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios
      .get("http://localhost:8000/api/check_city/" + formData.get("search"))
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate(`/city?c=${response.data["city_id"]}`, { replace: true });
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("City not found");
        } else {
          toast.error("An error occurred. Code: " + error.response.status);
        }
      });
    //console.log(formData.get("search"));
  };

  return (
    <div className="bg-red-100 relative h-screen md:h-[80vh] lg:h-[80vh]">
      <div className="h-screen md:h-full lg:h-full">
        <Carousel
          indicators={false}
          slideInterval={5000}
          className="rounded-none"
        >
          <img
            src="https://images.unsplash.com/photo-1536625979259-edbae645c7c3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
            className="object-cover h-screen "
          />
          <img
            src="https://images.unsplash.com/photo-1564934319095-299ca11c6e4f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
            className="object-cover h-screen"
          />
          <img
            src="https://images.unsplash.com/photo-1630088737201-00e30f542229?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
            className="object-cover h-screen"
          />
          <img
            src="https://images.unsplash.com/photo-1703028408829-ba45aa14b782?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
            className="object-cover h-screen"
          />
          <img
            src="https://images.unsplash.com/photo-1611520189922-f7b1ba7d801e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
            className="object-cover h-screen"
          />
        </Carousel>
      </div>

      <Card className="w-11/12 md:max-w-2xl lg:max-w-2xl absolute bottom-12 m-auto left-0 right-0 bg-gray-100 dark:bg-slate-800 border-0">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Navigate Your Next Adventure: Discover, Plan, Explore with Ease!
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          <form
            className="grid grid-cols-6  gap-1 grid-flow-row-dense"
            onSubmit={(e) => handleSearch(e)}
          >
            <div className="col-span-4 md:col-span-5 lg:col-span-5">
              <TextInput
                id="search"
                name="search"
                type="search"
                placeholder="Enter City Name and Country Name"
              />
            </div>
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <button className="search-button" type="submit">
                <svg
                  className="svgIcon"
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                <span>Find Now</span>
              </button>
            </div>
          </form>
        </p>
      </Card>
    </div>
  );
};

export default HeroSection;
