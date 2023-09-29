"use client";

import { FC, useState } from "react";
import DropdownComponent from "@/components/common/dropdown";
import VariantTags from "./variantTags";
import { ProductType } from "@/components/header/header";
import { usePathname, useSearchParams } from "next/navigation";
import LinksButton from "./links";
import AddToCartAndBuyNow from "./addToCartAndBuyNow";

const ProductDetails: FC<{ product: ProductType }> = ({ product }) => {
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

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentURL = `https://sanskrutinx.com${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const titleForLinks = `Shop ${product.name} at Sanskruti nx`;

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="break-words font-serif text-lg font-bold md:text-2xl">
            {product?.name}
          </h1>
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

        <span className="text-xs">Inclusive of all taxes</span>
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

      <AddToCartAndBuyNow
        _id={product._id}
        combinationString={combination.combinationString}
        pathname={pathname}
      />

      <div className="flex flex-col text-lg">
        <DropdownComponent main="Product Details" open>
          <span>{product?.description || ""}</span>
          <table className="w-full border-none capitalize">
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
          <table className="border-collapse border-[1px] border-slate-200 [&>*>*>*]:border-[1px] [&>*>*>*]:border-slate-200 [&>*>*>*]:p-2 [&>*>*]:border-[1px] [&>*>*]:border-slate-200 [&>*]:border-[1px] [&>*]:border-slate-200">
            <thead>
              <tr>
                <th className="text-center capitalize">
                  {filteredAttributes.map((data) => data.name).join(", ")}
                </th>
                <th className="text-center">Discount</th>
                <th className="text-center">Price</th>
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
                  <td className="text-center capitalize">
                    {variant.combinationString.join(", ")}
                  </td>
                  {variant?.discount ? (
                    <td className="text-center text-green-400">{`-${variant.discount}%`}</td>
                  ) : (
                    <td className="text-center">-</td>
                  )}
                  {variant?.discount ? (
                    <td className="flex items-baseline justify-center gap-2 border-none">
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
                    <td
                      className="text-center
                    "
                    >
                      &#8377;{variant?.price}
                    </td>
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
