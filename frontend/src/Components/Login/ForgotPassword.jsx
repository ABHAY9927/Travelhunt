import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        old_password: "",
        new_password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/reset-password/", formData);
            if (response.status === 200) {
                toast.success("Password Reset Successful! Please login with your new password.");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded mb-3"
                        onChange={handleChange}
                    />

                    <label className="block font-semibold">Old Password:</label>
                    <input
                        type="password"
                        name="old_password"
                        placeholder="Enter old password"
                        className="w-full p-2 border rounded mb-3"
                        onChange={handleChange}
                    />

                    <label className="block font-semibold">New Password:</label>
                    <input
                        type="password"
                        name="new_password"
                        placeholder="Enter new password"
                        className="w-full p-2 border rounded mb-3"
                        onChange={handleChange}
                    />

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
