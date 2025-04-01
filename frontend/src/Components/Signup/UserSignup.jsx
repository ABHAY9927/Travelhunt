import React from "react";
import axios from "axios";
import background from "../../images/signup-bg.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Function handling the form submission
const UserSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios
      .post("http://localhost:8000/api/validate_user_signup", formData)
      .then((response) => {
        if (response.status === 201) {
          //this.setState({ user });
          toast.success("User added successfully");
          navigate("/login", { replace: true });
        } else if (response.status === 500) {
          //this.setState({ error });
          toast.error("ERROR: " + response.data["error"]);
        } else {
          //this.setState({ error });
          toast.error("ERROR: Invalid Data");
        }
      })
      .catch((error) => {
        //this.setState({ error });
        toast.error("ERROR: Passwords does not match");
        console.log(error?.response?.status);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSignup(e)}>
        <div
          className="grid grid-cols-1 content-center bg-cover h-auto md:w-full p-12"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="grid grid-cols-1 gap-3 container rounded shadow-lg py-4 px-4 backdrop-blur-lg md:w-5/12 sm:w-full">
            <h1 className="text-center font-extrabold text-3xl py-3">
              Traveller - Sign Up
            </h1>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid grid-cols-1 justify-items-stretch">
                <label htmlFor="firstname" className="py-2 font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  className="rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-1 justify-items-stretch">
                <label htmlFor="lastname" className="py-2 font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  className="rounded-lg"
                  required
                />
              </div>
            </div>

            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="rounded-lg"
              required
            />

            <label htmlFor="mobile" className="font-bold">
              Phone
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Phone"
              className="rounded-lg"
              required
            />

            <label htmlFor="password1" className="font-bold">
              Enter Password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder="Password"
              className="rounded-lg"
              required
            />

            <label htmlFor="password2" className="font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
              className="rounded-lg"
              required
            />

            <input
              type="submit"
              name="signup"
              value="Sign up"
              className="text-white bg-cyan-600 rounded-lg py-2 place-content-center"
            />

            <div className="grid grid-cols-2 mt-4">
              <a href="/login" className="font-light text-white">
                Alread registered?
              </a>
              <a
                href="/admin-signup"
                className="text-right font-light  text-white"
              >
                Do you own a business?
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
