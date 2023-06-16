"use client";

import React from "react";
import DropdownComponent from "@/components/common/dropdown";
import VariantTags from "./variantTags";
import UIButton from "@/components/common/button";
import { ProductType } from "@/components/header/header";
import { useAppSelector } from "@/redux/store/hooks";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import Link from "next/link";

const ProductDetails: React.FC<{ product?: ProductType }> = ({ product }) => {
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const addToCart = () => {
    // axios.post()
  };

  return (
    <div className="flex w-full flex-col gap-5 px-[3vw] md:pl-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <h3 className="text-md font-semibold text-gray-600">
          {product?.brand_name}
        </h3>
      </div>

      <div className="flex flex-col gap-1">
        {product?.sale_price ? (
          <div className="flex items-baseline gap-2 text-lg">
            <span>&#8377;{product?.sale_price}</span>
            <s className="text-gray-500">&#8377;{product?.gst_price}</s>
            <span className="font-bold text-red-800">
              (
              {((product?.gst_price - product?.sale_price) /
                product?.gst_price) *
                100}
              % OFF)
            </span>
          </div>
        ) : (
          <span className="text-lg">&#8377;{product?.gst_price}</span>
        )}

        <span className="text-xs">inclusive of all taxes</span>
      </div>

      <div className="flex flex-col">
        <VariantTags
          main="Size"
          sub={[{ title: "S" }, { title: "M" }, { title: "L" }]}
        />
        <VariantTags
          main="Color"
          sub={[{ title: "Red" }, { title: "Green" }, { title: "Blue" }]}
        />
      </div>

      <div className="isolate z-20 flex gap-3 bg-white max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:border-t-2 max-md:border-gray-300 max-md:px-[3vw] max-md:py-2 max-md:shadow-top">
        {isAuthenticated ? (
          <>
            <UIButton className="w-full bg-white text-lg font-semibold text-black">
              ADD TO CART
            </UIButton>
            <UIButton className="w-full bg-black text-lg font-semibold text-white">
              BUY NOW
            </UIButton>
          </>
        ) : (
          <Link href="/auth/login" className="w-full">
            <UIButton className="w-full bg-white text-lg font-semibold text-black">
              SIGN IN
            </UIButton>
          </Link>
        )}
      </div>

      <div className="flex flex-col">
        <DropdownComponent main="Product Description" open>
          <span>{product?.description || ""}</span>
        </DropdownComponent>

        <DropdownComponent main="Style & Fit Tips">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            nobis adipisci excepturi temporibus aspernatur fuga culpa, maxime
            ipsum quidem dolorem! Odit ullam doloribus quibusdam iste minima
            esse laboriosam ad?
          </span>
        </DropdownComponent>

        <DropdownComponent main="Shipping & Returns">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            nobis adipisci excepturi temporibus aspernatur fuga culpa, maxime
            ipsum quidem dolorem! Odit ullam doloribus quibusdam iste minima
            esse laboriosam ad?
          </span>
        </DropdownComponent>

        <DropdownComponent main="FAQs">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            nobis adipisci excepturi temporibus aspernatur fuga culpa, maxime
            ipsum quidem dolorem! Odit ullam doloribus quibusdam iste minima
            esse laboriosam ad?
          </span>
        </DropdownComponent>
      </div>
    </div>
  );
};

export default ProductDetails;
