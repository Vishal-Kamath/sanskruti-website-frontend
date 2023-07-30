import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { cn } from "@/utils/lib";
import ImageZoom from "./imageZoom";
import Image from "next/image";

const ProductImageFullScreen: React.FC<{
  images: string[];
  imageIndex: number;
  image: string;
  handleSet: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}> = ({
  image,
  handleNext,
  handleSet,
  imageIndex,
  images,
  handlePrev,
  setFullscreenImageOpen,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 grid h-full max-h-screen min-h-screen w-full place-content-center",
        className
      )}
    >
      <div className="relative isolate h-screen w-screen bg-slate-950">
        {/* Background Image */}
        <Image
          width={50}
          height={50}
          src={image}
          alt="product image Background"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-50 blur-xl"
        />
        <div className="flex h-full max-h-screen w-full flex-col items-center justify-center gap-3 py-4">
          <ImageZoom src={image} alt="product image" />
          <Image
            width={500}
            height={500}
            src={image}
            alt="product image"
            className="h-full object-contain md:hidden"
          />
          <div className="custom_scrollbar flex h-fit max-w-[50vw] gap-2 overflow-x-auto overflow-y-hidden max-md:px-[3vw]">
            {images.map((imageSrc, index) => (
              <Image
                src={imageSrc}
                alt={index + " product image"}
                width={50}
                height={50}
                key={index}
                className={cn(
                  "aspect-auto h-20 w-auto",
                  imageIndex !== index && "opacity-60"
                )}
                onClick={() => handleSet(index)}
              />
            ))}
          </div>
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
          className="absolute right-5 top-5 z-10 rounded-full bg-white bg-opacity-50 p-3 text-2xl text-slate-700 hover:bg-opacity-100"
        >
          <RxCross1 />
        </button>
      </div>
    </div>
  );
};

export default ProductImageFullScreen;
