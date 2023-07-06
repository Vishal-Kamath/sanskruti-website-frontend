"use client";

import { cn } from "@/utils/lib";
import { FC, useCallback, useRef } from "react";
import { Swiper, SwiperProps, SwiperRef } from "swiper/react";
import { Navigation } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

const SwiperContainer: FC<SwiperProps> = ({
  children,
  className,
  modules,
  ...props
}) => {
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Swiper
      ref={sliderRef}
      className={cn("relative isolate", className)}
      modules={[Navigation, ...modules!]}
      navigation={{
        prevEl: ".prev_swiper",
        nextEl: ".next_swiper",
      }}
      {...props}
    >
      {children}

      <button
        onClick={handlePrev}
        className="prev_swiper absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white p-4 opacity-75 hover:opacity-100"
      >
        <FaAngleLeft className="h-4 w-4 lg:h-7 lg:w-7" />
      </button>
      <button
        onClick={handleNext}
        className="next_swiper absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white p-4 opacity-75 hover:opacity-100"
      >
        <FaAngleRight className="h-4 w-4 lg:h-7 lg:w-7" />
      </button>
    </Swiper>
  );
};

export default SwiperContainer;
