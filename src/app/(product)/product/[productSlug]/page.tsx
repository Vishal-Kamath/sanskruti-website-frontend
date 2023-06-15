"use client";

import ProductDetails from "./components/productDetails";
import ProductImageFullScreen from "./components/productImageFullScreen";
import ProductImageDisplay from "./components/productImagesDisplay";
import ProductCard from "@/components/productCard";
import { Metadata } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useParams } from "next/navigation";
import { ProductType } from "@/components/header/header";
import axios from "axios";

const images = [
  "/temp/productImage1.png",
  "/temp/productImage2.png",
  "/temp/productImage3.png",
];

interface Prop {
  params: { slug: string };
}
export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  return {
    title: `Sanskruti Nx - ${params.slug}`,
  };
}

const ProductPage = () => {
  const params = useParams();
  const slug = params["productSlug"];

  const [product, setProduct] = useState<ProductType>();

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

  useEffect(() => {
    axios
      .get<{ productAlreadyExists: ProductType }>(
        `${process.env.ENDPOINT}/api/v1/user/product?slug=${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setProduct(res.data.productAlreadyExists);
      });
  }, [slug]);

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
      <div className="mb-10 flex flex-col gap-6 pt-28 max-md:pt-32">
        <div className="flex items-start gap-5 max-md:flex-col">
          <ProductImageDisplay
            setFullscreenImageOpen={setFullscreenImageOpen}
            images={images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetails product={product} />
        </div>
        <div className="flex flex-col gap-3 px-[3vw]">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <Swiper
            spaceBetween={10}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {Array(12)
              .fill(null)
              .map((value, index) => (
                <SwiperSlide key={index}>
                  <ProductCard />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-3 px-[3vw]">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <Swiper
            spaceBetween={10}
            slidesPerView={numberSlides}
            className="flex w-full"
          >
            {Array(12)
              .fill(null)
              .map((value, index) => (
                <SwiperSlide key={index}>
                  <ProductCard />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
