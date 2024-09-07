import React, { useEffect, useState } from "react";
import './Body.css';

const images = [
  {
    src: "../Asset/image1.png"
  },
  {
    src: "../Asset/image2.png"
  },
  {
    src: "../Asset/image3.png"
  },
];

const Body = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='body'
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${images[currentImage].src})`
      }}
    >
      
    </div>
  );
};

export default Body;
