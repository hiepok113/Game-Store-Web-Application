import React, { useEffect, useState } from "react";
import './Cate.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cate = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryDetail = (gameId) => {
        navigate(`/categories/${gameId}`);
    };

    return (
        <div className="shop-cate">
            <h1>Popular genres</h1>
            <div className="cate-container">
                {categories.map((item, index) => {
                    return (
                        <div className="categories" onClick={() => handleCategoryDetail(item._id)}>
                            <div className="cate">
                                <img src={item.image} alt={item.name} />
                                <div className="overlay">{item.name}</div>
                            </div>

                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default Cate;
