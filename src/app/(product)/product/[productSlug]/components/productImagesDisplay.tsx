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
    <div className="flex w-fit shrink-0 flex-col justify-end gap-3 md:pl-[3vw] md:pr-0 lg:flex-row-reverse">
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
              width={500}
              height={500}
              src={image}
              alt="product image"
              className="-z-10 aspect-[2/3] max-h-[50rem] w-full max-w-[100vw] cursor-zoom-in object-cover max-md:min-w-[100vw] md:max-w-[30rem]"
              onClick={() => setFullscreenImageOpen(true)}
            />
          </SwiperSlide>
        ))}
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
      </Swiper>
      <div className="custom_scrollbar flex max-h-[50vh] gap-2 overflow-x-auto overflow-y-auto max-md:px-[3vw] lg:flex-col">
        {images.map((imageSrc, index) => (
          <Image
            src={imageSrc}
            alt={index + " product image"}
            width={50}
            height={50}
            key={index}
            className={cn(
              "aspect-[2/3] w-16 border-[1px] border-gray-400 bg-gray-100 object-contain",
              imageIndex !== index && "opacity-70"
            )}
            onClick={() => handleSet(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageDisplay;
