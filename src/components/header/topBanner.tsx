"use client";

import { FC, useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

const TopBanner: React.FC = () => {
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
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={isMobile ? 1 : 3}
      className="w-full flex bg-black text-white"
    >
      <SwiperSlide>
        <div className="flex items-center gap-2 text-sm justify-center">
          <FiPhoneCall />
          <span>+91-1234567890</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center gap-2 text-sm justify-center">
          <img src="/assets/truck.svg" alt="Shipping truck" />
          <span>Free Shipping in India</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="#visitOurStore"
          className="flex items-center gap-2 text-sm justify-center"
        >
          <MdLocationOn className="text-lg" />
          <span>Visit Our Store</span>
        </a>
      </SwiperSlide>
    </Swiper>
  );
};

export default TopBanner;
