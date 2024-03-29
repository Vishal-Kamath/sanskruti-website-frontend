"use client";

import UIButton from "@/components/common/button";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import AddressDropdown from "../components/addressDropdown";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAddressState } from "../utils/hook";
import Total from "../components/total";
import { BsArrowLeft } from "react-icons/bs";

const CartAddressPage: FC = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const addresses =
    user.address &&
    user.address.map((addr) => ({
      id: addr.id,
      title: addr.name,
      content: [
        addr.address,
        addr.city,
        addr.state,
        addr.country,
        addr.zip,
      ].join(" "),
    }));

  const [shipping, setShipping] = useAddressState("shippingAddress");
  const shippingInAddresses =
    addresses && addresses.find((addr) => addr.id === shipping?.id);

  const [billing, setBilling] = useAddressState("billingAddress");
  const billingInAddresses =
    addresses && addresses.find((addr) => addr.id === billing?.id);

  const dispatch = useAppDispatch();

  // check number and email verified
  // if (!user.Mobile_No_verified || !user.email_verified) {
  //   router.replace("/user/cart");
  //   return null;
  // }

  const handleSetShippingAddress = (id: string) => {
    const address = user.address && user.address.find((addr) => addr.id === id);
    if (!address) return;

    setShipping(address);
  };

  const handleSetBillingAddress = (id: string) => {
    const address = user.address && user.address.find((addr) => addr.id === id);
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

  // dropdown open logic
  const [shippingOpen, setShippingOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);

  const openAndCloseShipping = (action: "open" | "close") => {
    if (action === "open") {
      setShippingOpen(true);
      setBillingOpen(false);
    }
    if (action === "close") {
      setShippingOpen(false);
    }
  };

  const openAndCloseBilling = (action: "open" | "close") => {
    if (action === "open") {
      setBillingOpen(true);
      setShippingOpen(false);
    }
    if (action === "close") {
      setBillingOpen(false);
    }
  };

  return (
    <div className="flex w-full gap-5 max-lg:flex-col">
      <div className="flex h-full w-full flex-col gap-5">
        <div className="flex justify-between">
          <Link
            href="/user/cart"
            className="w-fit rounded-full border-[1px] border-gray-300 px-6 py-1 hover:bg-gray-100"
          >
            <BsArrowLeft className="h-6 w-auto" />
          </Link>
          <Link
            href={`/user/address/add?redirect=${encodeURIComponent(
              "/user/cart/address"
            )}`}
            className="w-fit"
          >
            <UIButton className="w-fit rounded-full border-[1px] border-sanskrutiRed px-5 text-sanskrutiRed hover:outline-sanskrutiRedLight">
              Add a new address
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
            open={shippingOpen}
            openAndClose={openAndCloseShipping}
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
            open={billingOpen}
            openAndClose={openAndCloseBilling}
          />
        </div>
      </div>
      <Total>
        {!!shippingInAddresses && !!billingInAddresses ? (
          <Link href="/user/cart/payment">
            <UIButton className="w-full rounded-full border-none bg-sanskrutiRed font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight">
              PROCEED
            </UIButton>
          </Link>
        ) : (
          <UIButton
            onClick={fillAllDetails}
            className="w-full rounded-full border-none bg-red-900 font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight"
          >
            PROCEED
          </UIButton>
        )}
      </Total>
    </div>
  );
};

export default CartAddressPage;
