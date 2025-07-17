import React from "react";
import img1 from "../Asset/role-play.png";
import img2 from "../Asset/adventure.png";
import img3 from "../Asset/Casual.png";
import img4 from "../Asset/stratery.png";
import img5 from "../Asset/sport.png";
import img6 from "../Asset/racing.png";

const categories = [
    { img: img1, label: "ROLE PLAY" },
    { img: img2, label: "ADVENTURE" },
    { img: img3, label: "CASUAL" },
    { img: img4, label: "STRATEGY" },
    { img: img5, label: "SPORT" },
    { img: img6, label: "RACING" },
];

const Category = () => {
    return (
        <div className="flex flex-col items-center py-10 min-h-[90vh] bg-[#121212] overflow-hidden">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
                CATEGORY
            </h1>
            <hr className="w-40 h-1 bg-white rounded-full mb-8" />

            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-black px-4">
                <div className="flex gap-4 w-max scroll-smooth snap-x snap-mandatory">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="relative w-[250px] h-[300px] flex-shrink-0 rounded-lg overflow-hidden bg-black cursor-pointer transform hover:scale-105 transition-transform duration-300 snap-start"
                        >
                            <img
                                src={cat.img}
                                alt={cat.label}
                                className="w-full h-full object-cover transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-2xl font-semibold tracking-wide">
                                    {cat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
