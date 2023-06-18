import { CartItem } from "@/redux/slice/cart.slice";
import Image from "next/image";
import { FC } from "react";

const CartProduct: FC<CartItem> = ({ ...product }) => {
  const sale_price = product?.sale_price * product.quantity;
  const gst_price = product?.gst_price * product.quantity;
  return (
    <div className="flex gap-1 bg-slate-50 p-1">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={100}
        height={100}
      />
      <div className="flex gap-3 max-lg:flex-col">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">
            {product.name.length > 35
              ? `${product.name.slice(0, 35)}...`
              : product.name}
          </h3>
          <div className="text-xs font-bold text-gray-700">
            {product.brand_name}
          </div>
        </div>
        <div>
          <button>+</button>
          {product.quantity}
          <button>-</button>
        </div>
      </div>
      <div>
        {sale_price ? (
          <div className="flex items-baseline gap-2 text-[14px]">
            <span>&#8377;{sale_price}</span>
            <s className="text-gray-500">&#8377;{gst_price}</s>
            <span className="font-bold text-red-800">
              ({Math.round(((gst_price - sale_price) / gst_price) * 100)}% OFF)
            </span>
          </div>
        ) : (
          <span className="text-[14px]">&#8377;{gst_price}</span>
        )}
      </div>
    </div>
  );
};

export default CartProduct;
