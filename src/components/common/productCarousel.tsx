"use client";

import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ProductCard, { DummyProductCard } from "../productCard";

const ProductCarousel: FC = () => {
  const [numberSlides, setNumberSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setNumberSlides(5);
      } else if (window.innerWidth > 768) {
        setNumberSlides(4);
      } else if (window.innerWidth > 640) {
        setNumberSlides(3);
      } else {
        setNumberSlides(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col gap-3 px-[3vw]">
      <h3 className="text-xl font-semibold">Similar Products</h3>
      <Swiper
        spaceBetween={15}
        slidesPerView={numberSlides}
        className="flex w-full"
      >
        {Array(12)
          .fill(null)
          .map((value, index) => (
            <SwiperSlide key={index}>
              <DummyProductCard />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
