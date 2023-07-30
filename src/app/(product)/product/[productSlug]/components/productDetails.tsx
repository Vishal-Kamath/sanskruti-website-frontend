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
import { usePathname, useSearchParams } from "next/navigation";
import LinksButton from "./links";
import { useRouter } from "next/navigation";

const ProductDetails: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const addToCart = async () => {
    const body = {
      productId: product._id,
      quantity: 1,
      variant: combination.combinationString,
    };

    await axios
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

  const handleBuyNow = async () => {
    await addToCart();
    router.push("/user/cart");
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentURL = `https://sanskrutinx.in${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const titleForLinks = `Shop ${product.name} at Sanskruti nx`;

  return (
    <div className="flex w-full flex-col gap-5 px-[3vw] md:pl-0">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <h3 className="text-md font-semibold text-gray-600">
            {product?.brand_name}
          </h3>
        </div>
        <LinksButton
          deepLinkUrl={currentURL}
          imageLink={product.images[0]}
          title={titleForLinks}
        />
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

      <div className="isolate z-20 flex gap-3 bg-white max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:border-t-2 max-md:border-gray-300 max-md:px-[3vw] max-md:py-2 max-md:shadow-top">
        {isAuthenticated ? (
          <>
            <UIButton
              className="w-full bg-white text-lg font-semibold text-black"
              onClick={addToCart}
            >
              ADD TO CART
            </UIButton>
            <UIButton
              className="w-full bg-black text-lg font-semibold text-white"
              onClick={handleBuyNow}
            >
              BUY NOW
            </UIButton>
          </>
        ) : (
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
            className="w-full"
          >
            <UIButton className="mx-auto w-full max-w-sm bg-white text-lg font-semibold text-black">
              SIGN IN
            </UIButton>
          </Link>
        )}
      </div>

      <div className="flex flex-col text-lg">
        <DropdownComponent main="Product Details" open>
          <span>{product?.description || ""}</span>
          <table className="w-full border-none">
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{product?.name}</td>
              </tr>
              <tr>
                <td>Category: </td>
                <td>{product?.MainCategory}</td>
              </tr>
              <tr>
                <td>Sub Category: </td>
                <td>{product?.SubCategory}</td>
              </tr>
            </tbody>
          </table>
        </DropdownComponent>

        <DropdownComponent main="Prices">
          <table className="border-none">
            <thead>
              <tr>
                <th className="text-left capitalize">
                  {filteredAttributes.map((data) => data.name).join(", ")}
                </th>
                <th className="text-center">Discount</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {product.varients.variations.map((variant, index) => (
                <tr
                  key={
                    variant.combinationString.toString() + index + product.name
                  }
                  className="text-sm"
                >
                  <td className="text-left capitalize">
                    {variant.combinationString.join(", ")}
                  </td>
                  {variant?.discount ? (
                    <td className="text-center text-green-400">{`-${variant.discount}%`}</td>
                  ) : (
                    <td className="text-center">-</td>
                  )}
                  {variant?.discount ? (
                    <td className="flex items-baseline justify-end gap-2">
                      <span>
                        &#8377;
                        {variant?.price *
                          ((100 - (variant?.discount || 0)) / 100)}
                      </span>
                      <s className="text-gray-500">
                        &#8377;
                        {variant?.price}
                      </s>
                      <span className="text-red-800">
                        ({variant?.discount}% OFF)
                      </span>
                    </td>
                  ) : (
                    <td className="text-right">&#8377;{variant?.price}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
