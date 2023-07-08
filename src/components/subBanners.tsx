"use client";

import { FC, useEffect, useState } from "react";

import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css/autoplay";
import Image from "next/image";
import axios from "axios";
import SwiperContainer from "./common/swiperContainer";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";

type Banner = {
  isPublished: boolean;
  desktopImage: string;
  mobileImage: string;
};

const SubBanner: FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>();

  const dispatch = useAppDispatch();

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

  const getBanners = () => {
    dispatch(startLoading());
    axios
      .get<{ subBanners: Banner[] }>(
        `${process.env.ENDPOINT}/api/v1/user/getAllSubBanners`
      )
      .then((res) => {
        dispatch(completeLoading());
        setBanners(res.data.subBanners);
      })
      .catch(() => {
        dispatch(completeLoading());
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="h-fit px-[3vw]">
      <SwiperContainer
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        spaceBetween={10}
      >
        {banners?.map((banner, index) => {
          const val = isMobile ? "mobileImage" : "desktopImage";
          return (
            <SwiperSlide className="-z-10" key={"sub banner slide " + index}>
              <Image
                src={banner[val]}
                alt={"sub banner image" + index}
                width={500}
                height={500}
                className="h-full w-full object-cover max-md:object-top xl:max-h-[70vh]"
              />
            </SwiperSlide>
          );
        })}
      </SwiperContainer>
    </div>
  );
};

export default SubBanner;
