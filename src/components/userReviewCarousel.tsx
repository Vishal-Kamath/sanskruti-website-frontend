"use client";

import { FC, useEffect, useState } from "react";

import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

import { userReviews } from "@/data/userReview";
import UIHeader from "./common/header";
import SwiperContainer from "./common/swiperContainer";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/utils/lib";

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

  const colorList = [
    "bg-amber-100 text-red-700",
    "bg-sky-100 text-blue-700",
    "bg-purple-100 text-violet-700",
  ];

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
          {userReviews.map((review, index) => {
            const Initials = review.name
              .split(" ")
              .map((name) => name[0].toLocaleUpperCase())
              .slice(0, 2)
              .join("");
            return (
              <SwiperSlide key={review.name + index}>
                <div className="flex h-[15rem] w-full flex-col items-center gap-7 overflow-hidden rounded-xl border-[1px] border-gray-400 px-5 py-7">
                  <div className="flex w-full items-center gap-4">
                    <div
                      className={cn(
                        "flex aspect-square h-10 w-10 items-center justify-center rounded-full text-lg",
                        colorList[index % 3]
                      )}
                    >
                      {Initials}
                    </div>
                    <div className="text-[16px] font-semibold">
                      {review.name}
                    </div>
                    <FcGoogle className="ml-auto h-6 w-6" />
                  </div>
                  <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                    <p className="text-justify font-normal text-gray-700">
                      &quot;{review.review}&quot;
                    </p>
                    <div className="mt-auto h-1 w-16 bg-slate-300"></div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperContainer>
      </div>
    </div>
  );
};

export default UserReviewCarousel;
