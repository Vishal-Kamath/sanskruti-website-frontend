"use client";

import UIButton from "@/components/common/button";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import AddressDropdown from "../components/addressDropdown";
import {
  selectBilling,
  selectShipping,
  setBillingAddress,
  setShippingAddress,
} from "@/redux/slice/cart.slice";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";

const CartAddressPage: FC = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const reduxInitialShipping = useAppSelector(selectShipping);
  const reduxInitialBilling = useAppSelector(selectBilling);

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

  const shippingInAddresses = addresses.find(
    (addr) => addr.id === reduxInitialShipping?.id
  );
  const shipping =
    !!reduxInitialShipping && !!shippingInAddresses
      ? shippingInAddresses
      : {
          title: "Shipping Address",
          content: "Select a shipping address",
        };

  const billingInAddresses = addresses.find(
    (addr) => addr.id === reduxInitialBilling?.id
  );
  const billing =
    !!reduxInitialBilling && !!billingInAddresses
      ? billingInAddresses
      : {
          title: "Billing Address",
          content: "Select a billing address",
        };

  const dispatch = useAppDispatch();

  // check number and email verified
  // if (!user.Mobile_No_verified || !user.email_verified) {
  //   router.replace("/user/cart");
  //   return null;
  // }

  const handleSetShippingAddress = (id: string) => {
    const address = user.address.find((addr) => addr.id === id);
    if (!address) return;

    dispatch(setShippingAddress({ address }));
  };

  const handleSetBillingAddress = (id: string) => {
    const address = user.address.find((addr) => addr.id === id);
    if (!address) return;

    dispatch(setBillingAddress({ address }));
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
        <Link href="/user/cart">
          <UIButton className="w-fit rounded-sm border-[1px] border-slate-400 px-5">
            Back
          </UIButton>
        </Link>
        <Link href="/user/address/add">
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
          main={shipping}
          title="Shipping Address"
          options={addresses}
          setAddress={handleSetShippingAddress}
        />
        <AddressDropdown
          main={billing}
          title="Billing Address"
          options={addresses}
          setAddress={handleSetBillingAddress}
        />
      </div>

      {!!shippingInAddresses && !!billingInAddresses ? (
        <Link href="/user/cart/payment" className="w-full">
          <UIButton className="w-full rounded-sm border-none bg-sanskrutiRed font-bold text-white hover:outline-sanskrutiRedLight">
            PROCEED
          </UIButton>
        </Link>
      ) : (
        <UIButton
          onClick={fillAllDetails}
          className="dfont-bold w-full rounded-sm border-none bg-red-900 text-white hover:outline-sanskrutiRedLight"
        >
          PROCEED
        </UIButton>
      )}
    </div>
  );
};

export default CartAddressPage;
