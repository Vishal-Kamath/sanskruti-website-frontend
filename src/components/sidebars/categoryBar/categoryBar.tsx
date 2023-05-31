"use client";

import { FC, useState, useEffect } from "react";
import CategoryCard from "./categoryCard";
import { useAppSelector } from "@/redux/store/hooks";
import { selectSidebarOpen } from "@/redux/slice/sidebar.slice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const categoryList: { image: string; title: string; link: string }[] = [
  {
    title: "Salwar Kameez",
    image: "/temp/Salwar Kameez.png",
    link: "/category/Salwar Kameez",
  },
  {
    title: "Lehenga's",
    image: "/temp/Lehenga's.png",
    link: "/category/Lehenga's",
  },
  {
    title: "Indo Western",
    image: "/temp/Indo Western.png",
    link: "/category/Indo Western",
  },
  {
    title: "Bridal",
    image: "/temp/Bridal.png",
    link: "/category/Bridal",
  },
  {
    title: "Kurti's",
    image: "/temp/Kurti's.png",
    link: "/category/Kurti's",
  },
  {
    title: "Western Wear",
    image: "/temp/Western Wear.png",
    link: "/category/Western Wear",
  },
  {
    title: "Dress Material's",
    image: "/temp/Dress Material's.png",
    link: "/category/Dress Material's",
  },
];

const CategoryBar: FC = () => {
  const open = useAppSelector(selectSidebarOpen);

  const [numberSlides, setNumberSlides] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setNumberSlides(4);
      } else if (window.innerWidth > 768) {
        setNumberSlides(3);
      } else if (window.innerWidth > 640) {
        setNumberSlides(2);
      } else {
        setNumberSlides(3);
      }

      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        !open && "max-sm:hidden"
      } isolate w-full bg-white px-[5vw] max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:z-30`}
    >
      <div className="flex flex-col gap-2 max-sm:max-h-screen max-sm:min-h-screen max-sm:overflow-y-auto max-sm:pt-36 max-sm:scrollbar-none">
        <h3 className="border-b-2 border-gray-300 pb-2 text-xl font-semibold">
          Categories
        </h3>

        {isMobile ? (
          <div className="sm:custom_scrollbar flex w-full gap-2 py-2 max-sm:flex-col max-sm:pb-20 sm:overflow-x-auto">
            {categoryList.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {categoryList.map((category) => (
              <SwiperSlide key={category.title} className="w-fit">
                <CategoryCard {...category} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
