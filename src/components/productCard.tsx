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

  return (
    <div className={cn("relative w-full flex-shrink-0", className)}>
      <Link
        href={`/product/${product.slug}`}
        className={cn("flex w-full flex-shrink-0 flex-col gap-2", className)}
      >
        <div>
          <div className="bg-gray-100">
            {product.images.length !== 0 ? (
              <Image
                src={product.images[0]}
                width={150}
                height={150}
                className="aspect-[2/2.5] h-full w-full object-cover object-top"
                alt="Product image"
              />
            ) : null}
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
