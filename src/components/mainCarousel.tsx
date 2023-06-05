"use client";

import { FC, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const Carousel: FC = () => {
  const images = {
    desktop: ["/temp/desktop1.png", "/temp/desktop2.png"],
    mobile: ["/temp/mobile1.png", "/temp/mobile2.png"],
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
    <div className="h-[70vh] bg-gradient-to-b from-gray-100 to-white">
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
              <Image
                src={images.mobile[index]}
                alt={images.mobile[index]}
                width={500}
                height={500}
                className="h-[70vh] w-full object-contain"
              />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={value}>
              <Image
                src={value}
                alt={value}
                width={500}
                height={500}
                className="h-[70vh] w-full object-contain"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
