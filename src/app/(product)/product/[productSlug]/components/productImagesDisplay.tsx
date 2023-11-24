import Image from "next/image";
import React, { RefObject } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/utils/lib";

const ProductImageDisplay: React.FC<{
  images: string[];
  imageIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleSet: (index: number) => void;
  sliderRef: RefObject<SwiperRef>;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onIndexChange: VoidFunction;
}> = ({
  images,
  imageIndex,
  handleNext,
  handlePrev,
  handleSet,
  sliderRef,
  setFullscreenImageOpen,
  onIndexChange,
}) => {
  return (
    <div className="flex w-full flex-col justify-end gap-3 md:pl-[3vw] md:pr-0 lg:flex-row-reverse">
      <Swiper
        ref={sliderRef}
        className="relative isolate w-full max-w-[100vw] md:max-w-[30rem]"
        modules={[Navigation]}
        slidesPerView={1}
        onRealIndexChange={onIndexChange}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image + index + "image"}
            className="w-full max-w-[100vw] max-md:min-w-[100vw] md:max-w-[30rem]"
          >
            <Image
              width={1440}
              height={1080}
              src={image}
              alt="product image"
              className="-z-10 w-full max-w-[100vw] cursor-zoom-in object-contain max-md:min-w-[100vw] md:max-w-[30rem]"
              onClick={() => setFullscreenImageOpen(true)}
            />
          </SwiperSlide>
        ))}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white py-3 pl-1 pr-3 opacity-50 hover:opacity-75"
          >
            <FaAngleLeft className="h-6 w-6" />
          </button>
        )}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white py-3 pl-3 pr-1 opacity-50 hover:opacity-75"
          >
            <FaAngleRight className="h-6 w-6" />
          </button>
        )}
      </Swiper>
      {images.length > 1 && (
        <div className="custom_scrollbar flex max-h-full gap-2 overflow-x-auto overflow-y-auto max-md:px-[3vw] lg:flex-col">
          {images.map((imageSrc, index) => (
            <Image
              src={imageSrc}
              alt={index + " product image"}
              width={100}
              height={200}
              key={index}
              className={cn(
                "aspect-[2/3] w-24 cursor-pointer border-[1px] bg-gray-100 object-contain lg:w-16",
                imageIndex !== index
                  ? "border-gray-200 opacity-70 hover:border-gray-400"
                  : "border-gray-500"
              )}
              onClick={() => handleSet(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageDisplay;
