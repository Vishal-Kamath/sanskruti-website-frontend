"use client";

import { FC, useEffect, useState, useRef } from "react";

import { SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css/autoplay";
import Image from "next/image";
import axios from "axios";
import { SwiperContainerRef } from "./common/swiperContainer";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";

type Banner = {
  isPublished: boolean;
  desktopImage: string;
  mobileImage: string;
};

const Carousel: FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const swiperRef = useRef<SwiperRef>(null);

  const dispatch = useAppDispatch();

  const getBanners = () => {
    dispatch(startLoading());
    axios
      .get<{ banners: Banner[] }>(
        `${process.env.ENDPOINT}/api/v1/user/getAllBanners`
      )
      .then((res) => {
        dispatch(completeLoading());
        setBanners(res.data.banners);
      })
      .catch(() => {
        dispatch(completeLoading());
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleMouseEnter = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <div
      className="h-fit bg-gradient-to-b from-gray-200 to-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SwiperContainerRef
        sliderRef={swiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
      >
        {banners?.map((banner, index) => {
          return (
            <SwiperSlide className="-z-10" key={"banner slide " + index}>
              <Image
                src={banner["mobileImage"]}
                alt={"banner image" + index}
                width={500}
                height={500}
                className="h-full w-full object-cover max-md:object-top md:hidden xl:max-h-[70vh]"
              />
              <Image
                src={banner["desktopImage"]}
                alt={"banner image" + index}
                width={500}
                height={500}
                className="h-full w-full object-cover max-md:hidden max-md:object-top xl:max-h-[70vh]"
              />
            </SwiperSlide>
          );
        })}
      </SwiperContainerRef>
    </div>
  );
};

export default Carousel;
