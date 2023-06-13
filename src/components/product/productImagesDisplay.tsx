import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

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
    <div className="flex w-fit shrink-0 flex-row-reverse justify-end gap-3 px-[3vw] md:pr-0">
      <div className="group relative w-fit max-w-2xl">
        <img
          src={images[currentImageIndex]}
          alt="product image"
          className="h-[80vh] cursor-zoom-in rounded-md border-2 border-black object-cover"
          onClick={() => setFullscreenImageOpen(true)}
        />
        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
        >
          <FaAngleLeft
            size={50}
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1 opacity-50 group-hover:opacity-75"
          />
        </div>

        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
        >
          <FaAngleRight
            size={50}
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1 opacity-50 group-hover:opacity-75"
          />
        </div>
      </div>
      <div className="custom_scrollbar flex flex-col gap-2 overflow-x-auto overflow-y-hidden py-3">
        {images.map((imageSrc, index) => (
          <img
            src={imageSrc}
            alt=""
            key={index}
            className={`aspect-auto h-20 w-auto rounded-md border-2 hover:outline hover:outline-4 hover:outline-gray-300 ${
              index === currentImageIndex ? "border-black" : "border-gray-600"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageDisplay;
