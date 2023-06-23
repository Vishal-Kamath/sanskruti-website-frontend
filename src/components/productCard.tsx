"use client";

import { filters } from "@/data/filterlist";
import { cn } from "@/utils/lib";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes, useState } from "react";
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

interface Props {
  className?: string;
  product: ProductType;
}
const ProductCard: FC<Props> = ({ className, product }) => {
  const disptach = useAppDispatch();
  const router = useRouter();
  const userWishlistIds = useAppSelector(selectWishlistIds);
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const liked = !!userWishlistIds.find(
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
        disptach(setWishlistIds({ ids: res.data.ids }));
      });
  };
  const unlikeProduct = () => {};

  return (
    <div className={cn("flex w-full flex-shrink-0 flex-col gap-2", className)}>
      <Link href={`/product/${product.slug}`}>
        <div className="bg-gray-100">
          {product.images.length !== 0 ? (
            <Image
              src={product.images[0]}
              width={500}
              height={500}
              className="aspect-[2/2.5] h-full w-full object-cover object-top"
              alt="Product image"
            />
          ) : null}
        </div>
      </Link>
      <button
        onClick={handleLike}
        className={cn(
          "flex h-8 w-full flex-shrink-0 items-center justify-center gap-2 rounded-sm border-[1px] text-xs font-medium",
          liked
            ? "border-red-300 bg-red-50 text-red-500 hover:border-red-600"
            : "border-gray-300 text-gray-500 hover:border-gray-600 hover:text-black"
        )}
      >
        <span>WISHLIST</span>
        {liked ? (
          <AiFillHeart className="h-4 w-4 text-red-600" />
        ) : (
          <AiOutlineHeart className="h-4 w-4" />
        )}
      </button>

      <Link
        href={`/product/${product.slug}`}
        className="flex h-full flex-col gap-2"
      >
        <div className="text-[0.8rem] font-medium text-gray-500">
          {product.name}
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm font-[550]">
          {product?.sale_price ? (
            <div className="flex items-baseline gap-2">
              <span>&#8377;{product?.sale_price}</span>
              <s className="text-gray-500">&#8377;{product?.gst_price}</s>
              <span className="text-red-800">
                (
                {Math.round(
                  ((product?.gst_price - product?.sale_price) /
                    product?.gst_price) *
                    100
                )}
                % OFF)
              </span>
            </div>
          ) : (
            <span>&#8377;{product?.gst_price}</span>
          )}
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;

interface DummyProps extends HTMLAttributes<HTMLDivElement> {}
export const DummyProductCard: FC<DummyProps> = ({ className }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className={cn("flex w-full flex-shrink-0 flex-col gap-2", className)}>
      <div>
        <div className="bg-gray-100">
          <Image
            src={filters[5].image}
            width={500}
            height={500}
            className="aspect-[2/2.5] h-full w-full object-cover object-top"
            alt="Product image"
          />
        </div>
      </div>
      <button
        onClick={() => setLiked((like) => !like)}
        className="flex h-8 w-full flex-shrink-0 items-center justify-center gap-2 rounded-sm border-[1px] border-gray-300 text-xs font-medium text-gray-500 hover:border-gray-600 hover:text-black"
      >
        <span>WISHLIST</span>
        {liked ? (
          <AiFillHeart className="h-4 w-4 text-red-600" />
        ) : (
          <AiOutlineHeart className="h-4 w-4" />
        )}
      </button>

      <div className="flex flex-col gap-2">
        <div className="text-[0.8rem] font-medium text-gray-500">
          Mint Green Printed Palazzo Suit In Chanderi With Embroidery Mint Green
          Printed
        </div>
        <div className="flex items-center gap-2 text-sm font-[550]">
          <span>&#8377;4,000</span>
          <s className="text-gray-500">&#8377;4,440</s>
        </div>
      </div>
    </div>
  );
};
