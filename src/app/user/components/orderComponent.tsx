import { FC } from "react";
import { Order } from "../order/page";
import Image from "next/image";
import Link from "next/link";

const OrderComponet: FC<{ order: Order }> = ({ order }) => {
  return (
    <Link
      href={`/user/order/${order.payment.orderId}`}
      className="flex gap-2 rounded-sm border-[1px] border-gray-300 p-2"
    >
      <div className="flex h-[8rem] w-[10rem] gap-1 overflow-hidden rounded-sm">
        {order.orders.map((order, index) => (
          <Image
            src={order.product.product.images[0]}
            key={order.product.product._id + order.orderId}
            alt={order.product.product.name}
            width={50}
            height={50}
            className="w-full overflow-hidden object-cover object-center"
          />
        ))}
      </div>
    </Link>
  );
};

export default OrderComponet;
