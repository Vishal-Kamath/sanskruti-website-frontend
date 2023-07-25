"use client";

import { FC, useState, useEffect } from "react";
import CategoryCard from "./categoryCard";

import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css/autoplay";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCategory } from "@/redux/slice/category.slice";
import SwiperContainer from "@/components/common/swiperContainer";
import UIHeader from "@/components/common/header";

const CategoryBar: FC = () => {
  const [numberSlides, setNumberSlides] = useState(4);

  const { categories } = useAppSelector(selectCategory);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setNumberSlides(5);
      } else if (window.innerWidth > 1024) {
        setNumberSlides(4);
      } else if (window.innerWidth > 768) {
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
    <div
      id="category"
      className="w-full bg-gradient-to-t from-white via-orange-200 via-20% to-white to-95% px-[3vw]"
    >
      <div className="flex flex-col gap-3">
        <UIHeader title="Shop by Category" />
        <SwiperContainer
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={numberSlides}
          className="flex w-full"
          autoplay={{
            delay: 1500,
            disableOnInteraction: true,
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category.Title} className="w-fit">
              <CategoryCard {...category} />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
    </div>
  );
};

export default CategoryBar;
