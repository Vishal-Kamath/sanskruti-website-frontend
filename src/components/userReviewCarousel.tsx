"use client";

import { FC, useEffect, useState } from "react";

import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

import Image from "next/image";
import { userReviews } from "@/data/userReview";
import UIHeader from "./common/header";
import SwiperContainer from "./common/swiperContainer";

const UserReviewCarousel: FC = () => {
  const [slideNum, setSlideNum] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSlideNum(3);
      } else if (window.innerWidth > 768) {
        setSlideNum(2);
      } else {
        setSlideNum(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="my-10 w-full bg-white px-[3vw]">
      <div className="flex flex-col gap-2">
        <UIHeader title="Customer Review's" />
        <SwiperContainer
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={slideNum}
          className="flex w-full"
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
        >
          {userReviews.map((review, index) => (
            <SwiperSlide key={review.image + index}>
              <div className="flex w-full flex-col items-center gap-5 overflow-hidden rounded-xl border-[1px] border-gray-400 px-5 py-12">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={500}
                  height={500}
                  className="h-[5rem] w-[5rem] rounded-full object-cover object-top"
                />
                <div className="flex w-full flex-col items-center justify-center gap-5">
                  <i className="text-center text-lg text-gray-700">
                    &quot;{review.review}&quot;
                  </i>
                  <div className="border-t-4 border-slate-400 pt-5 text-[16px]">
                    {review.name}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
    </div>
  );
};

export default UserReviewCarousel;
