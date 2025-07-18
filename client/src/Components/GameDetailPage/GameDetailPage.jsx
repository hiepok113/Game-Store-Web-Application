import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GameDetailPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/game/${id}`
                );
                setGame(response.data);
            } catch (error) {
                console.error("Error fetching game:", error);
            }
        };

        fetchGame();

        return () => {
            setGame({});
        };
    }, [id]);

    const handleBuyNow = () => {
        navigate(`/checkout/${id}`);
    };

    const formatPrice = price => {
        if (!price) return "";
        if (price === 0) return "FREE";
        return price.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
    };

    return (
        <div className="font-montserrat bg-[#1b1b1b] text-white min-h-screen p-5 flex flex-col items-center">
            <div className="w-full max-w-[1200px]">
                <header className="flex justify-between py-2"></header>
                <div className="flex flex-col lg:flex-row gap-5 w-full">
                    <div className="flex-3 bg-[#2b2b2b] p-5 rounded-lg w-full">
                        <h1 className="text-4xl font-bold mb-5 text-center">
                            {game.title}
                        </h1>
                        <div className="text-2xl mb-3 text-center">
                            {game.rating}/10
                        </div>
                        <div className="flex justify-center mb-5">
                            <span className="bg-gray-700 rounded-lg px-5 py-2">
                                {game.feature}
                            </span>
                        </div>
                        <div className="flex justify-center mb-5">
                            <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
                                Overview
                            </button>
                        </div>
                        <div className="mb-5">
                            <Carousel>
                                <div>
                                    <img
                                        src={game.image}
                                        alt="Screenshot 1"
                                        className="rounded-lg w-full object-cover"
                                    />
                                </div>
                            </Carousel>
                        </div>
                        <div className="mb-5">
                            <h2 className="text-2xl font-semibold mb-2">
                                About this game
                            </h2>
                            <img
                                src={game.image}
                                alt="About the game"
                                className="rounded-lg w-full mb-4"
                            />
                            <p className="text-base leading-7">
                                {game.description}
                            </p>
                        </div>
                        <div className="mb-5">
                            <h2 className="text-2xl font-semibold mb-2">
                                System Requirements
                            </h2>
                            <div className="flex flex-col lg:flex-row gap-5">
                                <div className="flex-1 bg-[#2b2b2b] p-5 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">
                                        MINIMUM:
                                    </h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            Requires a 64-bit processor and
                                            operating system
                                        </li>
                                        <li>OS: Windows 10</li>
                                        <li>
                                            Processor: INTEL CORE I5-8400 or AMD
                                            RYZEN 3 3300X
                                        </li>
                                        <li>Memory: 12 GB RAM</li>
                                        <li>
                                            Graphics: NVIDIA GEFORCE GTX 1060 3
                                            GB or AMD RADEON RX 580 4 GB
                                        </li>
                                        <li>DirectX: Version 12</li>
                                        <li>Storage: 60 GB available space</li>
                                        <li>
                                            Sound Card: Windows Compatible Audio
                                            Device
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-[#2b2b2b] p-5 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">
                                        RECOMMENDED:
                                    </h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            Requires a 64-bit processor and
                                            operating system
                                        </li>
                                        <li>OS: Windows 10/11</li>
                                        <li>
                                            Processor: INTEL CORE I7-8700K or
                                            AMD RYZEN 5 3600X
                                        </li>
                                        <li>Memory: 16 GB RAM</li>
                                        <li>
                                            Graphics: NVIDIA GEFORCE GTX 1070 8
                                            GB or AMD RADEON RX VEGA 56 8 GB
                                        </li>
                                        <li>DirectX: Version 12</li>
                                        <li>Storage: 60 GB available space</li>
                                        <li>
                                            Sound Card: Windows Compatible Audio
                                            Device
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="flex-1 bg-[#2b2b2b] p-5 rounded-lg text-center">
                        <img
                            src={game.logo}
                            alt="Logo"
                            className="w-full rounded-lg mb-5"
                        />
                        <div className="mb-5">
                            <button
                                onClick={handleBuyNow}
                                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold"
                            >
                                Buy Now
                            </button>
                        </div>
                        <div className="text-2xl font-bold">
                            {formatPrice(game.price)}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;
