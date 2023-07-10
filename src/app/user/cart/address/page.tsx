"use client";

import UIButton from "@/components/common/button";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import AddressDropdown from "../components/addressDropdown";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAddressState } from "../utils/hook";

const CartAddressPage: FC = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const addresses = user.address.map((addr) => ({
    id: addr.id,
    title: addr.fullName,
    content: [
      addr.landmark,
      addr.nearBy,
      addr.city,
      addr.state,
      addr.pincode,
    ].join(" "),
  }));

  const [shipping, setShipping] = useAddressState("shippingAddress");
  const shippingInAddresses = addresses.find(
    (addr) => addr.id === shipping?.id
  );

  const [billing, setBilling] = useAddressState("billingAddress");
  const billingInAddresses = addresses.find((addr) => addr.id === billing?.id);

  const dispatch = useAppDispatch();

  // check number and email verified
  // if (!user.Mobile_No_verified || !user.email_verified) {
  //   router.replace("/user/cart");
  //   return null;
  // }

  const handleSetShippingAddress = (id: string) => {
    const address = user.address.find((addr) => addr.id === id);
    if (!address) return;

    setShipping(address);
  };

  const handleSetBillingAddress = (id: string) => {
    const address = user.address.find((addr) => addr.id === id);
    if (!address) return;

    setBilling(address);
  };

  const fillAllDetails = () => {
    dispatch(
      setNotification({
        message: "Please fill the shipping and billing address",
        type: "warning",
      })
    );
    dispatch(showNotification());
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-between">
        <Link href="/user/cart" className="w-fit">
          <UIButton className="w-fit rounded-sm border-[1px] border-slate-400 px-5">
            Back
          </UIButton>
        </Link>
        <Link href="/user/address/add" className="w-fit">
          <UIButton className="flex w-fit gap-2 rounded-sm border-[1px] border-sanskrutiRed px-5 text-sanskrutiRed hover:outline-sanskrutiRedLight">
            <span>Add a new address</span>
          </UIButton>
        </Link>
      </div>

      <h4 className="text-justify text-gray-500">
        Please fill in both the billing and shipping addresses accurately to
        ensure timely delivery. Contact our support team for assistance. Thank
        you for choosing Sanskruti nx!
      </h4>

      <div className="flex w-full flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
        <AddressDropdown
          main={
            shippingInAddresses || {
              title: "Shipping Address",
              content: "Select a shipping address",
            }
          }
          title="Shipping Address"
          options={addresses}
          setAddress={handleSetShippingAddress}
        />
        <AddressDropdown
          main={
            billingInAddresses || {
              title: "Billing Address",
              content: "Select a billing address",
            }
          }
          title="Billing Address"
          options={addresses}
          setAddress={handleSetBillingAddress}
        />
      </div>

      {!!shippingInAddresses && !!billingInAddresses ? (
        <Link href="/user/cart/payment" className="ml-auto w-fit">
          <UIButton className="w-fit rounded-sm border-none bg-sanskrutiRed px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight">
            PROCEED
          </UIButton>
        </Link>
      ) : (
        <UIButton
          onClick={fillAllDetails}
          className="ml-auto w-fit rounded-sm border-none bg-red-900 px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight"
        >
          PROCEED
        </UIButton>
      )}
    </div>
  );
};

export default CartAddressPage;
