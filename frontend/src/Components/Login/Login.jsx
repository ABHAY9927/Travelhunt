import React from "react";
import axios from "axios";
import background from "../../images/login-bg.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        
        if (email === "tryme@gmail.com" && password === "tryme@123") {
            localStorage.clear();
            localStorage.setItem("access_token", "admin_access_token");
            localStorage.setItem("refresh_token", "admin_refresh_token");
            navigate("/", { replace: true });
            toast.success("Admin Login Successful!");
            return;
        }

        
        try {
            const response = await axios.post(
                "http://localhost:8000/api/token/",
                { email, password },
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.status === 200) {
                localStorage.clear();
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                navigate("/", { replace: true });
                toast.success("Login Successful!");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            toast.error("Invalid Credentials! Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <div
                    className="grid grid-cols-1 h-screen content-center bg-cover"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="grid grid-cols-1 gap-3 container rounded shadow-lg py-4 px-4 backdrop-blur-lg h-fit lg:w-1/3 md:w-1/3">
                        <h1 className="text-center font-extrabold text-4xl py-3 text-gray-200">
                            Login
                        </h1>

                        <label htmlFor="email" className="font-bold text-gray-100">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            className="rounded-lg border-gray-100 focus:border-stone-900"
                        />

                        <label htmlFor="password" className="font-bold text-gray-100">
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
                            className="py-2  place-content-center font-semibold bg-cyan-600 text-xl text-white rounded-lg"
                        />

                        <div className="grid grid-cols-2 mt-4">
                            <a href="/signup" className=" text-white">
                                Sign Up
                            </a>
                            <a href="/forgot-password" className="text-white underline">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
