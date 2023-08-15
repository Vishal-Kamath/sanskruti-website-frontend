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
  let sliderRef = useRef<SwiperRef>(null);

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
        className="prev_swiper absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white py-3 pl-1 pr-3 opacity-40 hover:opacity-75"
      >
        <FaAngleLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="next_swiper absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white py-3 pl-3 pr-1 opacity-40 hover:opacity-75"
      >
        <FaAngleRight className="h-6 w-6" />
      </button>
    </Swiper>
  );
};

export default SwiperContainer;

export const SwiperContainerRef: FC<
  SwiperProps & { sliderRef: React.RefObject<SwiperRef> }
> = ({ children, className, modules, sliderRef, ...props }) => {
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
        className="prev_swiper absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white py-3 pl-1 pr-3 opacity-50 hover:opacity-75"
      >
        <FaAngleLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="next_swiper absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white py-3 pl-3 pr-1 opacity-50 hover:opacity-75"
      >
        <FaAngleRight className="h-6 w-6" />
      </button>
    </Swiper>
  );
};
