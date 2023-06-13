import React from "react";
import DropdownComponent from "@/components/common/dropdown";
import VariantTags from "./varientTags";
import UIButton from "@/components/common/button";

const ProductDetails: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-5 px-[3vw] md:pl-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          Blue Moon Floral Anarkali Suit With Gotta Work In Cotton
        </h1>
        <h3 className="text-md font-semibold text-gray-600">SKU SG136346</h3>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2 font-semibold">
          <span className="text-xl font-semibold">Rs. 5,450</span>
          <s className="text-sm text-gray-400">6,850</s>
        </div>
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
        <DropdownComponent main="Product Details" open>
          <table className="w-fit">
            <tbody>
              <tr>
                <td>Style No:</td>
                <td>SG136346</td>
              </tr>
              <tr>
                <td>Colors:</td>
                <td>Red, Green, Blue</td>
              </tr>
              <tr>
                <td>Fabric:</td>
                <td>Cotton</td>
              </tr>
              <tr>
                <td>Work:</td>
                <td>Gotta Patti, Print</td>
              </tr>
              <tr>
                <td>Neck Line:</td>
                <td>Round</td>
              </tr>
              <tr>
                <td>Sleeves:</td>
                <td>3/4th Sleeve</td>
              </tr>
              <tr>
                <td>Manufactured / Packed by:</td>
                <td>Sanskruti</td>
              </tr>
            </tbody>
          </table>
          <span>
            Blue moon blue anarkali suit printed in a floral design and
            embroidered in gotta work lace and buttis. <br /> The anarkali has a
            round neckline, 3/4 sleeves, embroidered yoke, hem, cuffs, and a
            hook-up placket.
          </span>
        </DropdownComponent>

        <DropdownComponent main="Style & Fit Tips" open>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            nobis adipisci excepturi temporibus aspernatur fuga culpa, maxime
            ipsum quidem dolorem! Odit ullam doloribus quibusdam iste minima
            esse laboriosam ad?
          </span>
        </DropdownComponent>

        <DropdownComponent main="Shipping & Returns" open>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            nobis adipisci excepturi temporibus aspernatur fuga culpa, maxime
            ipsum quidem dolorem! Odit ullam doloribus quibusdam iste minima
            esse laboriosam ad?
          </span>
        </DropdownComponent>

        <DropdownComponent main="FAQs" open>
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
