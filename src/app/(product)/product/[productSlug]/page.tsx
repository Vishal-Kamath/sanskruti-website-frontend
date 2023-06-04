"use client";

import ProductDetails from "@/components/product/productDetails";
import ProductImageFullScreen from "@/components/product/productImageFullScreen";
import ProductImageDisplay from "@/components/product/productImagesDisplay";
import ProductCard from "@/components/productCard";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const images = [
  "/temp/productImage1.png",
  "/temp/productImage2.png",
  "/temp/productImage3.png",
];

const ProductPage: NextPage<{ slug: string }> = ({ slug }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImageOpen, setFullscreenImageOpen] = useState(false);

  const [numberSlides, setNumberSlides] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

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

      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentImageIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };
  return (
    <>
      <Head>
        <title>{`Product - ${slug}`}</title>
      </Head>
      {fullscreenImageOpen && (
        <ProductImageFullScreen
          imageSrc={images[currentImageIndex]}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setFullscreenImageOpen={setFullscreenImageOpen}
        />
      )}
      <div className="mb-10 flex flex-col gap-6 pt-24 max-md:pt-36">
        <div className="flex items-start gap-5 max-md:flex-col">
          <ProductImageDisplay
            setFullscreenImageOpen={setFullscreenImageOpen}
            images={images}
            currentImageIndex={currentImageIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetails />
        </div>
        <div className="flex flex-col gap-3 px-[5vw]">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <Swiper
            spaceBetween={10}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {Array(12)
              .fill(null)
              .map((value, index) => (
                <SwiperSlide>
                  <ProductCard key={index} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-3 px-[5vw]">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <Swiper
            spaceBetween={10}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {Array(12)
              .fill(null)
              .map((value, index) => (
                <SwiperSlide>
                  <ProductCard key={index} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.productSlug;
  return {
    props: {
      slug,
    },
  };
};
