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
import UIHeader from "./common/header";

type Banner = {
  isPublished: boolean;
  desktopImage: string;
  mobileImage: string;
  bannerLink: string;
};

const SubBanner: FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const dispatch = useAppDispatch();

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
    <div className="flex flex-col gap-5 px-[3vw] py-5">
      <UIHeader title="Editor's Pick" />
      <div className="h-fit">
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
          {banners
            ?.filter((banner) => banner.isPublished)
            .map((banner, index) => {
              return (
                <SwiperSlide
                  className="-z-10"
                  key={"sub banner slide " + index}
                >
                  <a
                    href={banner?.bannerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={banner["mobileImage"]}
                      alt={"sub banner image" + index}
                      width={1440}
                      height={1080}
                      className="h-full w-full object-cover max-md:object-top md:hidden xl:max-h-[70vh]"
                    />
                    <Image
                      src={banner["desktopImage"]}
                      alt={"sub banner image" + index}
                      width={1080}
                      height={1440}
                      className="h-full w-full object-cover max-md:hidden max-md:object-top xl:max-h-[70vh]"
                    />
                  </a>
                </SwiperSlide>
              );
            })}
        </SwiperContainer>
      </div>
    </div>
  );
};

export default SubBanner;
