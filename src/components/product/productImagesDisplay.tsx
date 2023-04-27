import React from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const ProductImageDisplay: React.FC<{
  images: string[];
  currentImageIndex: number;
  prevSlide: VoidFunction;
  nextSlide: VoidFunction;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  images,
  currentImageIndex,
  nextSlide,
  prevSlide,
  setCurrentImageIndex,
  setFullscreenImageOpen,
}) => {
  return (
    <div className="flex w-full flex-col px-[5vw] md:pr-0">
      <div className="group relative max-w-2xl">
        <img
          src={images[currentImageIndex]}
          alt="product image"
          className="cursor-zoom-in rounded-md object-cover"
          onClick={() => setFullscreenImageOpen(true)}
        />
        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
        >
          <BsChevronCompactLeft
            size={50}
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 opacity-50 group-hover:opacity-100"
          />
        </div>

        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
        >
          <BsChevronCompactRight
            size={50}
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 opacity-50 group-hover:opacity-100"
          />
        </div>
      </div>
      <div className="custom_scrollbar flex gap-2 overflow-x-auto overflow-y-hidden py-3">
        {images.map((imageSrc, index) => (
          <img
            src={imageSrc}
            alt=""
            key={index}
            className={`aspect-auto h-auto w-20 rounded-md border-2 ${
              index === currentImageIndex ? 'border-black' : 'border-gray-300'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageDisplay;
