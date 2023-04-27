import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const ProductImageFullScreen: React.FC<{
  imageSrc: string;
  prevSlide: VoidFunction;
  nextSlide: VoidFunction;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ imageSrc, nextSlide, prevSlide, setFullscreenImageOpen }) => {
  return (
    <div className="fixed left-0 top-0 isolate z-50 grid max-h-screen min-h-screen w-full place-content-center bg-black bg-opacity-75">
      <img src={imageSrc} alt="zoomed image" className="max-h-screen" />

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
      <button
        onClick={() => setFullscreenImageOpen(false)}
        className="absolute right-5 top-5 rounded-md border-2 border-gray-300 bg-slate-700 p-2 text-2xl text-white"
      >
        <RxCross1 />
      </button>
    </div>
  );
};

export default ProductImageFullScreen;
