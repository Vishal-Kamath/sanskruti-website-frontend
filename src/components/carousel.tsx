import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Carousel: React.FC = () => {
  const images = {
    desktop: ['temp/desktop1.png', 'temp/desktop2.png'],
    mobile: ['temp/mobile1.png', 'temp/mobile2.png'],
  };
  const [isMobile, setIsMobile] = useState<boolean>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? images.desktop.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.desktop.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const jumpToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative group">
        <img
          src={
            isMobile
              ? images.mobile[currentIndex]
              : images.desktop[currentIndex]
          }
          className="w-full h-full rounded-sm bg-center bg-cover duration-500"
        />

        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-white opacity-75 hover:opacity-100 cursor-pointer"
        >
          <BsChevronCompactLeft size={30} />
        </div>

        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-white opacity-75 hover:opacity-100 cursor-pointer"
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>
      {/* Page Dots */}
      <div className="flex justify-center py-2">
        {images.desktop.map((slide, index) => (
          <RxDotFilled
            onClick={() => jumpToSlide(index)}
            className={`${
              currentIndex === index ? 'text-sky-500' : 'text-gray-300'
            } text-2xl`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
