"use client";

import { FC, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

const Carousel: FC = () => {
  const images = {
    desktop: ["temp/desktop1.png", "temp/desktop2.png"],
    mobile: ["temp/mobile1.png", "temp/mobile2.png"],
  };
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="px-[5vw]">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className="flex"
      >
        {images.desktop.map((value, index) => {
          return isMobile ? (
            <SwiperSlide key={images.mobile[index]}>
              <img
                src={images.mobile[index]}
                alt={images.mobile[index]}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={value}>
              <img
                src={value}
                alt={value}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
