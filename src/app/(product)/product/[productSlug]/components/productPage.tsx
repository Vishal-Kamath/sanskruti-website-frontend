"use client";

import { ProductType } from "@/components/header/header";
import { FC, useCallback, useRef, useState } from "react";
import ProductImageFullScreen from "./productImageFullScreen";
import ProductImageDisplay from "./productImagesDisplay";
import ProductDetails from "./productDetails";
import { SwiperRef } from "swiper/react";
import { cn } from "@/utils/lib";
import ProductReview from "./review/productReview";
import RecomenedProducts from "./recomendedProducts";

const ProductPageComponent: FC<{ product: ProductType }> = ({ product }) => {
  const [fullscreenImageOpen, setFullscreenImageOpen] = useState(false);

  const sliderRef = useRef<SwiperRef>(null);
  const [imageIndex, setImageIndex] = useState(
    sliderRef.current?.swiper.realIndex
      ? sliderRef.current?.swiper.realIndex
      : 0
  );

  const handleSet = useCallback((index: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(index);
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const onIndexChange = () =>
    sliderRef.current &&
    sliderRef.current.swiper.realIndex !== null &&
    sliderRef.current.swiper.realIndex !== undefined &&
    setImageIndex(sliderRef.current.swiper.realIndex);

  return (
    <>
      <ProductImageFullScreen
        images={product?.images || []}
        imageIndex={imageIndex}
        handleSet={handleSet}
        image={product?.images[imageIndex] || ""}
        handleNext={handleNext}
        handlePrev={handlePrev}
        setFullscreenImageOpen={setFullscreenImageOpen}
        className={cn(!fullscreenImageOpen && "hidden")}
      />
      <div className="mb-10 flex flex-col gap-6 pt-36 md:pt-40">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-5 max-lg:flex-col">
          <ProductImageDisplay
            setFullscreenImageOpen={setFullscreenImageOpen}
            images={product?.images || []}
            imageIndex={imageIndex}
            sliderRef={sliderRef}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleSet={handleSet}
            onIndexChange={onIndexChange}
          />
          <div className="flex w-full flex-col gap-5 px-[3vw] md:max-lg:mt-12 lg:pl-0">
            <ProductDetails product={product} />
            <ProductReview id={product._id} />
          </div>
        </div>

        <RecomenedProducts
          mainCategory={product.MainCategory}
          subCategory={product.SubCategory}
        />
      </div>
    </>
  );
};

export default ProductPageComponent;
