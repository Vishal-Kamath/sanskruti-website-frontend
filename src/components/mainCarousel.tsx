"use client";

import { FC, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import axios from "axios";

type Banner = {
  isPublished: boolean;
  desktopImage: string;
  mobileImage: string;
};

const Carousel: FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
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

  const getBanners = async () => {
    const { banners } = (
      await axios.get<{ banners: Banner[] }>(
        `${process.env.ENDPOINT}/api/v1/user/getAllBanners`
      )
    ).data;
    setBanners(banners);
  };
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="h-fit bg-gradient-to-b from-gray-200 to-white">
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
        {banners?.map((banner, index) => {
          const val = isMobile ? "mobileImage" : "desktopImage";
          return (
            <SwiperSlide key={"banner slide " + index}>
              <Image
                src={banner[val]}
                alt={"banner image" + index}
                width={500}
                height={500}
                className="h-full w-full object-cover max-md:object-top xl:max-h-[70vh]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
