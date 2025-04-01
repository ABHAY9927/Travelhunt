import React from "react";
import axios from "axios";
import background from "../../images/admin-signup-bg.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Function handling the form submission
const AdminSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios
      .post("http://localhost:8000/api/validate_admin_signup", formData)
      .then((response) => {
        if (response.status === 201) {
          //this.setState({ user });
          toast.success("Data added successfully");
          navigate("/admin-login", { replace: true });
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
          className="grid grid-cols-1 h-full content-center bg-cover h-screen md:w-full"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="grid grid-cols-1 gap-3 container border-4 py-4 px-4 bg-zinc-100/50 md:w-5/12 sm:w-full">
            <h1 className="text-center font-extrabold text-4xl py-3">
              Business - Sign Up
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

            <div className="grid grid-cols-2 gap-3">
              <div className="grid grid-cols-1 justify-items-stretch">
                <label htmlFor="email" className="py-2 font-bold">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Business Email"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 justify-items-stretch">
                <label htmlFor="business_tel" className="py-2 font-bold">
                  Business Phone
                </label>
                <input
                  type="tel"
                  name="business_tel"
                  id="business_tel"
                  placeholder="Business Phone"
                  className="rounded-lg"
                  required
                />
              </div>
            </div>

            <label htmlFor="business_reg_no" className="font-bold">
              Enter Business Registration Number
            </label>
            <input
              type="text"
              name="business_reg_no"
              id="business_reg_no"
              placeholder="Business Registration Number"
              className="rounded-lg"
              required
            />

            <label htmlFor="business_address" className="font-bold">
              Enter Business Address
            </label>
            <input
              type="text"
              name="business_address"
              id="business_address"
              placeholder="Business Address"
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
              className="border-b-4 text-white bg-cyan-600 rounded-lg py-2 place-content-center"
            />

            <div className="grid grid-cols-2 mt-2">
              <a
                href="/admin-login"
                className="font-bold underline text-blue-700"
              >
                Already a registered?
              </a>
              <a
                href="/signup"
                className="font-bold underline text-blue-700 text-right"
              >
                Sign up as a Traveller
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSignup;
