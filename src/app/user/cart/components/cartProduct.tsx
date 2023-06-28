import { CartItem } from "@/redux/slice/cart.slice";
import Image from "next/image";
import { FC } from "react";
import { RxCross1 } from "react-icons/rx";

const CartProduct: FC<CartItem> = ({ ...product }) => {
  const combination =
    product.varients.variations.find(
      (variant) =>
        JSON.stringify(variant.combinationString) ===
        JSON.stringify(product.variants.combinationString)
    ) || product.varients.variations[0];

  const price = !!combination?.discount
    ? combination?.price * ((100 - combination?.discount) / 100)
    : combination?.price;
  return (
    <div className="relative flex w-full gap-3 rounded-md border-[1px] border-gray-300 p-3">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={100}
        height={100}
        className="rounded-[4px]"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">
            {product.name.length > 35
              ? `${product.name.slice(0, 35)}...`
              : product.name}
          </h3>
          <div className="text-xs font-bold text-gray-500">
            {product.brand_name}
          </div>
        </div>
        <div className="flex h-5 w-fit rounded-md border-[1px] border-gray-400 bg-slate-100 [&>*]:h-5 [&>*]:w-5">
          <button className="grid place-content-center border-r-[1px] border-gray-400">
            +
          </button>
          <span className="grid place-content-center border-r-[1px] border-gray-400">
            {product.quantity}
          </span>
          <button className="grid place-content-center">-</button>
        </div>
        <div>
          {combination.discount ? (
            <div className="flex items-baseline gap-2 text-[14px]">
              <span>&#8377;{price}</span>
              <s className="text-gray-500">&#8377;{combination.price}</s>
              <span className="font-bold text-red-800">
                ({combination.discount}% OFF)
              </span>
            </div>
          ) : (
            <span className="text-[14px]">&#8377;{price}</span>
          )}
        </div>
      </div>

      <RxCross1 className="absolute right-3 top-3 h-4 w-4" />
    </div>
  );
};

export default CartProduct;
