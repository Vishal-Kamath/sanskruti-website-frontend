import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxDot } from 'react-icons/rx';

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
      <div className="group relative">
        <img
          key={
            isMobile
              ? images.mobile[currentIndex]
              : images.desktop[currentIndex]
          }
          src={
            isMobile
              ? images.mobile[currentIndex]
              : images.desktop[currentIndex]
          }
          className="h-full w-full rounded-sm bg-cover bg-center duration-500"
        />

        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="absolute left-5 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-2xl opacity-75 hover:opacity-100 group-hover:block"
        >
          <BsChevronCompactLeft size={30} />
        </div>

        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-2xl opacity-75 hover:opacity-100 group-hover:block"
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>
      {/* Page Dots */}
      <div className="flex justify-center py-2">
        {images.desktop.map((slide, index) => {
          return currentIndex === index ? (
            <RxDotFilled
              key={slide}
              onClick={() => jumpToSlide(index)}
              className="text-3xl"
            />
          ) : (
            <RxDot
              key={slide}
              onClick={() => jumpToSlide(index)}
              className="text-3xl"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
