import React from "react";
import newest from "../Asset/newest";
import Item from "../Item/Item";

const Newest = () => {
    return (
        <div className="flex flex-col items-center gap-2 mt-[-220px] min-h-[130vh] bg-[#0f0f11]">
            <h1 className="text-white text-5xl font-semibold mt-12">NEWEST</h1>
            <hr className="w-[200px] h-[2px] rounded-full bg-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 w-4/5 cursor-pointer">
                {newest.map((item, i) => (
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

export default Newest;
