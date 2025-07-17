import React from "react";

const Item = ({ image, name, new_price, old_price }) => {
    return (
        <div className="item flex flex-col items-center gap-2 p-4 hover:scale-105 transition-transform duration-500">
            <img
                src={image}
                alt={name}
                className="w-[300px] h-[300px] object-cover rounded-lg"
            />
            <p className="text-gray-400">{name}</p>
            <div className="flex gap-4">
                <span className="text-yellow-300 font-semibold text-lg">
                    {new_price} VND
                </span>
                <span className="text-gray-500 line-through text-lg">
                    {old_price} VND
                </span>
            </div>
        </div>
    );
};

export default Item;
