import React from "react";
import background from "../../images/admin-login-bg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    await axios
      .post("http://localhost:8000/token/", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.clear();
          localStorage.setItem("access_token", response.data["access"]);
          localStorage.setItem("refresh_token", response.data["refresh"]);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;

          navigate("/business_home", { replace: true });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          toast.error(
            error?.response?.status + "Unauthorized. Check your credentials"
          );
        } else if (error?.response?.status === 400) {
          toast.error(error?.response?.status + "User not found");
        } else {
          toast.error("Sorry an error occured.");
        }
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
        <div
          className="grid grid-cols-1 h-screen content-center bg-cover"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="grid grid-cols-1 gap-3 container border-4 py-4 px-4 bg-zinc-100/50 h-fit lg:w-1/3 md:w-full">
            <h1 className="text-center font-extrabold text-4xl py-3">
              Business - Login
            </h1>

            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="rounded-lg border-gray-100 focus:border-stone-900"
            />

            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="rounded-lg border-gray-100 focus:border-stone-900"
            />

            <input
              type="submit"
              name="login"
              value="Login"
              className="py-2 border-b-4 place-content-center font-semibold bg-cyan-600 text-xl text-white rounded-lg"
            />

            <div className="grid grid-cols-1 mt-4">
              <a
                href="/admin-signup"
                className="font-bold underline text-blue-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
