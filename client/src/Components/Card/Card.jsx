import React from "react";
import card from "../Asset/card";

const Card = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b bg-[#0f0f11] to-[#2c2c3e] py-10 px-5 flex flex-wrap justify-center items-start gap-10">
            {card.map((item, i) => (
                <div
                    key={i}
                    className="bg-[#0f0f11] backdrop-blur-md rounded-xl shadow-xl text-white w-full max-w-2xl p-5"
                >
                    <img
                        src={item.img}
                        alt={item.name}
                        className="w-full rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                    <p className="text-base mb-4">{item.des}</p>
                    <button className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-md text-sm">
                        {item.id === 1 ? "FREE" : "Browse"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Card;
