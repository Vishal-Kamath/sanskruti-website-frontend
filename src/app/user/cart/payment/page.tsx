import UIButton from "@/components/common/button";
import Link from "next/link";
import { FC } from "react";

const CartPaymemtPage: FC = () => {
  return (
    <div>
      <UIButton className="w-fit px-3 py-2">
        <Link href="/user/cart/address">Back</Link>
      </UIButton>
    </div>
  );
};

export default CartPaymemtPage;
