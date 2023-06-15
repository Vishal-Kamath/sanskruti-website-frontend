"use client";

import { FC, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { userReviews } from "@/data/userReview";

const UserReviewCarousel: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-10 w-full bg-white px-[3vw]">
      <div className="flex h-[35rem] flex-col gap-2 sm:h-[30rem]">
        <div className="text-center text-lg font-bold">Customer Review</div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 2}
          className="flex w-full"
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
        >
          {userReviews.map((review, index) => (
            <SwiperSlide key={review.image + index}>
              <div className="flex w-full items-center gap-5 rounded-xl border-2 border-gray-300 p-5 max-sm:flex-col">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={500}
                  height={500}
                  className="h-[20rem] w-fit rounded-lg object-contain"
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <i className="text-center text-sm text-gray-400">
                    &quot;{review.review}&quot;
                  </i>
                  <div>{review.name}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UserReviewCarousel;
