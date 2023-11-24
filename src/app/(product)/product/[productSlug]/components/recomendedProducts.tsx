"use client";

import { ResultType } from "@/app/(product)/category/[...categories]/page";
import { ProductType } from "@/components/header/header";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ProductCard from "@/components/productCard";

const RecomenedProducts: FC<{ mainCategory: string; subCategory: string }> = ({
  mainCategory,
  subCategory,
}) => {
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<ProductType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `?MainCategory=${mainCategory}&SubCategory=${subCategory}`;
    axios
      .get<ResultType>(
        `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSimilarProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {});
  }, [mainCategory, subCategory]);

  useEffect(() => {
    axios
      .get<ResultType>(
        `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters?is_best_seller=true`
      )
      .then((res) => {
        const response = res.data;
        setBestSellerProducts(response.products);
      })
      .catch(() => {});
  }, []);

  // Swipper
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
    <div className="flex flex-col gap-12 px-[3vw]">
      {similarProducts && similarProducts.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <Swiper
            spaceBetween={15}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {similarProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
      {bestSellerProducts && bestSellerProducts.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Best Sellers</h3>
          <Swiper
            spaceBetween={15}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {bestSellerProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </div>
  );
};

export default RecomenedProducts;
