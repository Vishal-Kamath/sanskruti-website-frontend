import UIButton from "@/components/common/button";
import Link from "next/link";
import { FC } from "react";

const CartAddressPage: FC = () => {
  return (
    <div className="flex gap-3">
      <UIButton className="w-fit px-3 py-2">
        <Link href="/user/cart">Back</Link>
      </UIButton>
      <UIButton className="w-fit px-3 py-2">
        <Link href="/user/cart/payment">Next</Link>
      </UIButton>
    </div>
  );
};

export default CartAddressPage;
