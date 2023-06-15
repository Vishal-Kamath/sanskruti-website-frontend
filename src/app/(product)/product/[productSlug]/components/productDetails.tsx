import React from "react";
import DropdownComponent from "@/components/common/dropdown";
import VariantTags from "./varientTags";
import UIButton from "@/components/common/button";
import { ProductType } from "@/components/header/header";

const ProductDetails: React.FC<{ product?: ProductType }> = ({ product }) => {
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
          <div className="flex items-baseline gap-2 font-semibold">
            <span className="text-xl font-semibold">{product?.sale_price}</span>
            <s className="text-sm text-gray-400">{product?.gst_price}</s>
          </div>
        ) : (
          <span className="text-xl font-semibold">{product?.gst_price}</span>
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
        <UIButton className="text-md w-full bg-white font-semibold text-black">
          ADD TO CART
        </UIButton>
        <UIButton className="text-md w-full bg-black font-semibold text-white">
          BUY NOW
        </UIButton>
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
