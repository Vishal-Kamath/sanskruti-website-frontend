"use client";

import UIButton from "@/components/common/button";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { Address, setAddress } from "@/redux/slice/user.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import axios from "axios";
import Link from "next/link";
import { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

export const AddressComponent: FC<Address> = ({
  name,
  id,
  city,
  tel,
  address,
  country,
  email,
  zip,
  state,
}) => {
  const dispatch = useAppDispatch();
  const deleteAddress = async () => {
    const doesUserWantToDeleteAddress = confirm(
      `Are you sure you want to delete "${name}" address?`
    );
    if (!doesUserWantToDeleteAddress) return;

    await axios
      .delete<NotificationType & { address: Address[] }>(
        `${process.env.ENDPOINT}/api/v1/user/address?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        dispatch(setAddress(response.address));
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
  };

  return (
    <div className="flex h-full min-h-[15rem] w-full flex-col rounded border-2 border-gray-200 p-3">
      <h2 className="text-lg font-medium">{name}</h2>
      <h4 className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
        <span>{email}</span>
        <BsDot className="h-4 w-4" />
        <span>+{tel}</span>
      </h4>
      <div className="break-words text-sm text-gray-500">
        {address} {city} {state} {country} {zip}
      </div>
      <div className="ml-auto mt-auto flex gap-2">
        <Link href={`/user/address/edit?id=${id}`}>
          <UIButton className="flex w-fit items-center gap-1 border-gray-300 px-3 py-1 text-blue-500 hover:outline-blue-200">
            <span>Edit</span>
            <AiFillEdit />
          </UIButton>
        </Link>
        <UIButton
          onClick={deleteAddress}
          className="flex w-fit items-center gap-1 border-gray-300 px-3 py-1 text-red-500 hover:outline-red-200"
        >
          Delete
        </UIButton>
      </div>
    </div>
  );
};
