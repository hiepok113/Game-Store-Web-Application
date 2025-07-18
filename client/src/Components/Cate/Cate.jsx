import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cate = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/category"
                );
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryDetail = gameId => {
        navigate(`/categories/${gameId}`);
    };

    return (
        <div className="flex flex-col items-start gap-2.5 h-[120vh] overflow-hidden ml-[100px] mb-8">
            <h1 className="text-white text-[50px] font-semibold mt-[100px] text-left mr-2.5">
                Popular genres
            </h1>
            <div className="flex flex-wrap w-full gap-y-[50px]">
                {categories.map(item => (
                    <div
                        key={item._id}
                        onClick={() => handleCategoryDetail(item._id)}
                        className="w-1/4 flex cursor-pointer"
                    >
                        <div className="relative flex items-center justify-center transition-transform duration-300 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-[350px] h-[350px] object-cover transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-[30px] font-semibold">
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cate;
