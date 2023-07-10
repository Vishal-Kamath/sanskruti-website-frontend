"use client";

import { FC, useState } from "react";
import DropdownComponent from "@/components/common/dropdown";
import VariantTags from "./variantTags";
import UIButton from "@/components/common/button";
import { ProductType } from "@/components/header/header";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import Link from "next/link";
import axios from "axios";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";

const ProductDetails: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const filteredAttributes = product.varients.attributes.filter((attr) => {
    const filterAttr = attr.childern.filter((child) => child.state);
    return !!filterAttr.length;
  });

  const [variations, setVariations] = useState(
    product.varients.variations[0]?.combinationString.slice() || []
  );
  const combination =
    product.varients.variations.find(
      (variation) =>
        JSON.stringify(variation.combinationString) ===
        JSON.stringify(variations)
    ) || product.varients.variations[0];

  const addToCart = () => {
    const body = {
      productId: product._id,
      quantity: 1,
      variant: combination.combinationString,
    };

    axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/cart`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          setNotification({
            message: res.data.message,
            type: res.data.type,
          })
        );
        dispatch(showNotification());
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
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
        {!!combination?.discount ? (
          <div className="flex items-baseline gap-2 text-lg">
            <span>
              &#8377;
              {combination?.price *
                ((100 - (combination?.discount || 0)) / 100)}
            </span>
            <s className="text-gray-500">
              &#8377;
              {combination?.price}
            </s>
            <span className="font-bold text-red-800">
              ({combination?.discount}% OFF)
            </span>
          </div>
        ) : (
          <span className="text-lg">&#8377;{combination?.price}</span>
        )}

        <span className="text-xs">inclusive of all taxes</span>
      </div>

      <div className="flex flex-col">
        {filteredAttributes.map((variant, index) => (
          <VariantTags
            key={variant.name}
            variantSetters={(value: string) =>
              setVariations((variation) => {
                variation[index] = value;
                return variation.slice();
              })
            }
            variant={variant}
          />
        ))}
      </div>

      <div className="isolate z-20 flex max-w-md gap-3 bg-white max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:border-t-2 max-md:border-gray-300 max-md:px-[3vw] max-md:py-2 max-md:shadow-top">
        {isAuthenticated ? (
          <>
            <UIButton
              className="w-full bg-white text-lg font-semibold text-black"
              onClick={addToCart}
            >
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
