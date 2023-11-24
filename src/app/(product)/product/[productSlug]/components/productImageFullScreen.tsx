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
        "fixed left-0 top-0 z-50 flex h-full max-h-screen w-full items-center justify-center",
        className
      )}
    >
      <div className="relative isolate h-full w-full bg-slate-950">
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
            width={1440}
            height={1080}
            src={image}
            alt="product image"
            className="h-full object-contain md:hidden"
          />
          {images.length > 1 && (
            <div className="custom_scrollbar flex h-fit max-w-[50vw] gap-2 overflow-x-auto overflow-y-hidden max-md:px-[3vw]">
              {images.map((imageSrc, index) => (
                <Image
                  src={imageSrc}
                  alt={index + " product image"}
                  width={100}
                  height={200}
                  key={index}
                  className={cn(
                    "aspect-auto h-20 w-auto",
                    imageIndex !== index && "opacity-60"
                  )}
                  onClick={() => handleSet(index)}
                />
              ))}
            </div>
          )}
        </div>
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="group absolute left-0 top-0 flex h-full w-[25%] items-center justify-start"
          >
            <div className="z-50 w-fit rounded-r-full bg-white py-3 pl-1 pr-3 opacity-50 group-hover:opacity-80">
              <FaAngleLeft className="h-6 w-6" />
            </div>
          </button>
        )}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="group absolute right-0 top-0 flex h-full w-[25%] items-center justify-end"
          >
            <div className="z-50 w-fit rounded-l-full bg-white py-3 pl-3 pr-1 opacity-50 group-hover:opacity-80">
              <FaAngleRight className="h-6 w-6" />
            </div>
          </button>
        )}

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
