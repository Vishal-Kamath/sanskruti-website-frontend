"use client";

import { filters } from "@/data/filterlist";
import { cn } from "@/utils/lib";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const ProductCard: FC<Props> = ({ className }) => {
  const [liked, setLiked] = useState(false);
  const slug = "product-slug";
  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <Link href={`/product/${slug}`} className="flex flex-col gap-1">
        <div className="bg-gray-100">
          <Image
            src={filters[5].image}
            width={500}
            height={500}
            className="aspect-[2/2.5] h-full w-full rounded-md object-cover object-top"
            alt="Product image"
          />
        </div>
        <div className="text-sm font-normal">
          Mint Green Printed Palazzo Suit In Chanderi With Embroidery Mint Green
          Printed
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <span>&#8377;4,000</span>
          <s className="text-gray-500">&#8377;4,440</s>
        </div>
      </Link>
      <div className="absolute right-3 top-3 grid h-7 w-7 place-content-center rounded-full bg-white bg-opacity-30 hover:bg-opacity-100">
        <input
          type="checkbox"
          name="like"
          id="like"
          onChange={() => setLiked(!liked)}
          className="absolute left-0 top-0 h-full w-full opacity-0"
        />
        {liked ? (
          <AiFillHeart className="h-5 w-5 text-red-600" />
        ) : (
          <AiOutlineHeart className="h-5 w-5" />
        )}
      </div>
    </div>
  );
};
export default ProductCard;
