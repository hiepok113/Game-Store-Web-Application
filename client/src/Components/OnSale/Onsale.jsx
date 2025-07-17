import React from "react";
import Item from "../Item/Item";
import data_product from "../Asset/data";

const Onsale = () => {
    return (
        <div className="flex flex-col items-center py-12 min-h-[90vh] bg-[#121212]">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-2">
                ON SALE
            </h1>
            <hr className="w-40 h-1 bg-gray-300 rounded-full mb-8" />
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl px-4">
                {data_product.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.img}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Onsale;
