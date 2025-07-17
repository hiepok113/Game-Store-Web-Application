import React from "react";
import ins_icon from "../Asset/ins.png";
import face_icon from "../Asset/facebook.png";
import footer_logo from "../Asset/logo.png";

const Footer = () => {
    return (
        <footer className="w-full bg-gray text-gray-300 py-10 px-4">
            <div className="flex flex-col items-center justify-center">
                {/* Logo */}
                <div className="flex items-center gap-4 mb-6">
                    <img src={footer_logo} alt="Logo" className="w-20 h-auto" />
                    <p className="text-xl font-bold tracking-wide text-white">
                        SPICY GAME
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-6 mb-6">
                    <a
                        href="#"
                        className="transform hover:scale-110 transition duration-300"
                    >
                        <img
                            src={ins_icon}
                            alt="Instagram"
                            className="w-10 h-10"
                        />
                    </a>
                    <a
                        href="#"
                        className="transform hover:scale-110 transition duration-300"
                    >
                        <img
                            src={face_icon}
                            alt="Facebook"
                            className="w-10 h-10"
                        />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <hr className="w-1/2 mx-auto border-gray-600 mb-4 opacity-40" />
                    <p className="text-sm md:text-base">
                        &copy; 2024 - Designed by{" "}
                        <span className="text-white font-semibold">
                            SPICY GAME
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
