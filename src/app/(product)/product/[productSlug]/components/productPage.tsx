"use client";

import { ProductType } from "@/components/header/header";
import { FC, useState } from "react";
import ProductImageFullScreen from "./productImageFullScreen";
import ProductImageDisplay from "./productImagesDisplay";
import ProductDetails from "./productDetails";
import ProductCarousel from "@/components/common/productCarousel";

const ProductPageComponent: FC<{ product: ProductType }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImageOpen, setFullscreenImageOpen] = useState(false);

  const prevSlide = () => {
    if (!product) return;
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? product.images.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextSlide = () => {
    if (!product) return;
    const isLastSlide = currentImageIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <>
      {fullscreenImageOpen && (
        <ProductImageFullScreen
          imageSrc={product?.images[currentImageIndex] || ""}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setFullscreenImageOpen={setFullscreenImageOpen}
        />
      )}
      <div className="mb-10 flex flex-col gap-6 pt-40">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-5 max-md:flex-col">
          <ProductImageDisplay
            setFullscreenImageOpen={setFullscreenImageOpen}
            images={product?.images || []}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetails product={product} />
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default ProductPageComponent;
