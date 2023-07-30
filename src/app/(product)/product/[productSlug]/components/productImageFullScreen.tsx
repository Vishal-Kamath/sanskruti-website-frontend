import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { cn } from "@/utils/lib";
import ImageZoom from "./imageZoom";

const ProductImageFullScreen: React.FC<{
  image: string;
  handleNext: () => void;
  handlePrev: () => void;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}> = ({ image, handleNext, handlePrev, setFullscreenImageOpen, className }) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 isolate z-50 grid max-h-screen min-h-screen w-full place-content-center bg-black bg-opacity-75",
        className
      )}
    >
      <div className="flex h-full w-full items-center justify-center">
        <ImageZoom src={image} alt="product image" />
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white py-3 pl-1 pr-3 opacity-50 hover:opacity-75"
      >
        <FaAngleLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white py-3 pl-3 pr-1 opacity-50 hover:opacity-75"
      >
        <FaAngleRight className="h-6 w-6" />
      </button>
      <button
        onClick={() => setFullscreenImageOpen(false)}
        className="absolute right-5 top-5 z-10 border-2 border-gray-500 bg-slate-700 p-2 text-2xl text-white"
      >
        <RxCross1 />
      </button>
    </div>
  );
};

export default ProductImageFullScreen;
