"use client";

import { FC, useState, useEffect } from "react";
import UIHeader from "../../components/common/header";
import { ProductType } from "../../components/header/header";
import axios from "axios";
import { ResultType } from "@/app/(product)/category/[categoryName]/page";
import SwiperContainer from "../../components/common/swiperContainer";
import ProductCard from "../../components/productCard";
import { SwiperSlide } from "swiper/react";

const FeaturedProducts: FC = () => {
  const [products, setProducts] = useState<ProductType[]>();
  const [numberSlides, setNumberSlides] = useState(4);

  useEffect(() => {
    axios
      .get<ResultType>(
        `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters?is_featured=true`
      )
      .then((res) => {
        const response = res.data;
        setProducts(response.products);
      })
      .catch(() => {});
  }, []);

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

  return products && products.length ? (
    <div className="flex flex-col gap-3 px-[3vw]">
      <UIHeader title="Featured Products" />

      <SwiperContainer
        modules={[]}
        spaceBetween={15}
        slidesPerView={numberSlides}
        className="flex w-full"
      >
        {products?.map((product, index) => (
          <SwiperSlide key={"featured products " + product._id + index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </div>
  ) : (
    <></>
  );
};

export default FeaturedProducts;
