import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/register", {
                email,
                username,
                password,
            })
            .then(result => {
                setSuccessMessage(
                    "Registration successful! Redirecting to login..."
                );
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch(err => {
                console.error("Error:", err);
            });
    };

    return (
        <div
            className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(17,17,17,0.9), rgba(17,17,17,0.9)), url(https://static.vecteezy.com/system/resources/previews/003/303/295/original/mountains-background-game-vector.jpg)",
            }}
        >
            <div className="bg-[#1e1e20] bg-opacity-80 p-10 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Create Your Account
                </h1>
                <p className="text-sm text-center text-gray-400 mb-6">
                    Already a member?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-400 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {successMessage && (
                    <p className="text-green-400 text-sm mb-4 text-center">
                        {successMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full h-[50px] bg-[#373B43] flex items-center px-4 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full h-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div className="w-full h-[50px] bg-[#373B43] flex items-center px-4 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className="w-full h-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div className="w-full h-[50px] bg-[#373B43] flex items-center px-4 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full h-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-[50px] bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold rounded-xl flex justify-center items-center"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
