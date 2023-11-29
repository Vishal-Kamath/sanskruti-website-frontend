"use client";

import { FiPhoneCall } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import ContactNumber from "../common/contackNumber";

const TopBanner: FC = () => {
  const [displayNum, setDisplayNum] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setDisplayNum(3);
      } else if (window.innerWidth > 768) {
        setDisplayNum(2);
      } else {
        setDisplayNum(1);
      }
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
      slidesPerView={displayNum}
      className="flex w-full bg-slate-100 text-black"
    >
      <SwiperSlide>
        <a
          href="tel:911234567890"
          className="mx-auto flex h-8 w-fit items-center justify-center gap-2 text-sm"
        >
          <FiPhoneCall />
          <ContactNumber />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href="/shipping"
          className="mx-auto flex h-8 w-fit items-center justify-center gap-2 text-sm"
        >
          <Image
            src="/assets/truck.svg"
            alt="Shipping truck"
            width={20}
            height={20}
            className="h-fit w-fit"
          />
          <span>Free Shipping in India</span>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href="/store"
          className="mx-auto flex h-8 w-fit items-center justify-center gap-2 text-sm"
        >
          <MdLocationOn className="text-lg" />
          <span>Visit Our Store</span>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default TopBanner;
