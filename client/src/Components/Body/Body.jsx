import React, { useEffect, useState } from "react";

const images = [
    {
        src: require("../Asset/image1.png"),
        title: "God of War: Ragnarok",
        price: "$49.99",
    },
    {
        src: require("../Asset/image2.png"),
        title: "Call of Duty: Modern Warfare",
        price: "$59.99",
    },
    {
        src: require("../Asset/image3.png"),
        title: "Cyberpunk 2077",
        price: "$39.99",
    },
];

const Body = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prevImage => (prevImage + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const { src, title, price } = images[currentImage];

    return (
        <div className="w-full bg-[#0f0f11] text-white py-6 flex justify-center">
            <div className="flex gap-6 w-full max-w-[1200px] px-6">
                {/* LEFT SIDE: Main content */}
                <div
                    className="flex-1 bg-cover bg-center rounded-2xl p-10 flex flex-col justify-end h-[80vh] transition-all duration-700"
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url(${src})`,
                    }}
                >
                    <div className="max-w-md">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Khám phá và trải nghiệm những tựa game hot nhất hôm
                            nay!
                        </p>
                        <p className="text-2xl text-yellow-400 font-bold mb-4">
                            {price}
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <button className="bg-white text-black font-semibold px-6 py-2 rounded-full">
                                Mua ngay
                            </button>
                            <button className="border border-gray-400 px-6 py-2 rounded-full text-sm text-gray-300">
                                Thêm vào danh sách mong muốn
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Thumbnail selector */}
                <div className="w-[220px] flex flex-col gap-4 overflow-y-auto">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`cursor-pointer rounded-lg p-2 flex items-center gap-3 transition ${
                                idx === currentImage
                                    ? "bg-gray-700"
                                    : "hover:bg-[#1a1a1d]"
                            }`}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className="w-12 h-16 object-cover rounded"
                            />
                            <span className="text-sm">{img.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Body;
