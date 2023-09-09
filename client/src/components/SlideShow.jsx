import React, { useState, useEffect } from 'react';

const SlideShow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval); 
  }, [images]);

  return (
    <img
    src={images[currentIndex]}
    alt={`Image ${currentIndex}`}
    className={`rounded-xl object-cover aspect-square transition-all duration-500 `}
  />
  
  );
};

export default SlideShow;
