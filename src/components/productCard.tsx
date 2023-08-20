"use client";

import { filters } from "@/data/filterlist";
import { cn } from "@/utils/lib";
import Image from "next/image";
import Link from "next/link";
import {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ProductType } from "./header/header";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import { useRouter } from "next/navigation";
import {
  selectWishlistIds,
  setWishlistIds,
} from "@/redux/slice/wishlist.slice";
import axios from "axios";
import UIButton from "./common/button";

// Swiper
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import { GoDotFill } from "react-icons/go";

interface Props {
  className?: string;
  product: ProductType;
}
const ProductCard: FC<Props> = ({ className, product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userWishlistIds = useAppSelector(selectWishlistIds);
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const liked = !!userWishlistIds?.find(
    (listProduct) => listProduct === product._id
  );

  const handleLike = () => {
    if (!isAuthenticated) return router.push("/auth/login");

    if (!liked) likeProduct();
    else unlikeProduct();
  };

  const likeProduct = () => {
    axios
      .post<{ ids: string[] }>(
        `${process.env.ENDPOINT}/api/v1/user/wishlist`,
        {
          productId: product._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setWishlistIds({ ids: res.data.ids }));
      })
      .catch(() => {});
  };

  const unlikeProduct = () => {
    axios
      .delete<{ ids: string[] }>(
        `${process.env.ENDPOINT}/api/v1/user/wishlist?productId=${product._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setWishlistIds({ ids: res.data.ids }));
      })
      .catch(() => {});
  };

  const price = !!product.varients.variations[0]?.discount
    ? product.varients.variations[0]?.price *
      ((100 - product.varients.variations[0]?.discount) / 100)
    : product.varients.variations[0]?.price;

  // Image change code
  const swiperRef = useRef<SwiperRef>(null);
  const [imageIndex, setImageIndex] = useState(
    swiperRef.current?.swiper.realIndex
      ? swiperRef.current?.swiper.realIndex
      : 0
  );

  const handleMouseEnter = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
      handleSet(0);
    }
  };

  const handleSet = useCallback((index: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideTo(index);
  }, []);

  const onIndexChange = () =>
    swiperRef.current &&
    swiperRef.current.swiper.realIndex !== null &&
    swiperRef.current.swiper.realIndex !== undefined &&
    setImageIndex(swiperRef.current.swiper.realIndex);

  useEffect(() => {
    handleMouseLeave();
  }, []);

  return (
    <div
      className={cn("group relative w-full flex-shrink-0", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn("flex w-full flex-shrink-0 flex-col gap-2", className)}
      >
        <div>
          <div className="relative isolate overflow-hidden bg-gray-100">
            {product.images.length !== 0 ? (
              <Swiper
                ref={swiperRef}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                onRealIndexChange={onIndexChange}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={product.name + " image " + index}>
                    <Image
                      src={image}
                      width={150}
                      height={150}
                      className="aspect-[2/2.5] h-full w-full object-cover object-top"
                      alt="Product image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
            <div className="absolute bottom-0 z-10 flex w-full translate-y-full flex-wrap justify-center gap-1 bg-white px-1 py-2 transition-all duration-200 ease-in-out group-hover:translate-y-0">
              {product.images.map((_, index) => (
                <GoDotFill
                  key={product.name + " nav " + index}
                  className={cn(
                    "h-2 w-2",
                    imageIndex === index ? "text-sanskrutiRed" : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-2">
          <div className="text-sm font-medium text-gray-500">
            {product.name}
          </div>
          <div className="mt-auto flex items-center gap-2 text-[16px] font-[550]">
            {!!product.varients.variations[0]?.discount ? (
              <div className="flex items-baseline gap-2">
                <span>&#8377;{price}</span>
                <s className="text-gray-500">
                  &#8377;{product.varients.variations[0]?.price}
                </s>
                <span className="text-red-800">
                  ({product.varients.variations[0].discount}% OFF)
                </span>
              </div>
            ) : (
              <span>&#8377;{price}</span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={handleLike}
        className={cn(
          "absolute right-0 top-0 rounded-bl-md bg-opacity-75 p-2",
          liked
            ? "border-red-300 bg-red-200 text-red-500 hover:border-red-600"
            : "border-gray-300 bg-white text-black hover:border-gray-600 hover:text-black"
        )}
      >
        {liked ? (
          <AiFillHeart className="h-4 w-4 text-red-600" />
        ) : (
          <AiOutlineHeart className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};
export default ProductCard;

interface DummyProps extends HTMLAttributes<HTMLDivElement> {}
export const DummyProductCard: FC<DummyProps> = ({ className }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className={cn("relative w-full flex-shrink-0", className)}>
      <div
        className={cn("flex w-full flex-shrink-0 flex-col gap-2", className)}
      >
        <div>
          <div className="bg-gray-100">
            <Image
              src={filters[5].image}
              width={150}
              height={150}
              className="aspect-[2/2.5] h-full w-full object-cover object-top"
              alt="Product image"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500">
            Mint Green Printed Palazzo Suit In Chanderi With Embroidery Mint
            Green Printed
          </div>
          <div className="flex items-center gap-2 text-[16px] font-[550]">
            <span>&#8377;4,000</span>
            <s className="text-gray-500">&#8377;4,440</s>
          </div>
        </div>
      </div>
      <button
        onClick={() => setLiked((like) => !like)}
        className={cn(
          "absolute right-0 top-0 rounded-bl-md bg-opacity-75 p-2",
          liked
            ? "border-red-300 bg-red-200 text-red-500 hover:border-red-600"
            : "border-gray-300 bg-white text-black hover:border-gray-600 hover:text-black"
        )}
      >
        {liked ? (
          <AiFillHeart className="h-4 w-4 text-red-600" />
        ) : (
          <AiOutlineHeart className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};
