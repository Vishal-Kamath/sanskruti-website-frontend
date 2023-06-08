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

export const AddressComponent: FC<Address> = ({
  fullName,
  id,
  city,
  contactNo,
  landmark,
  nearBy,
  pincode,
  state,
}) => {
  const dispatch = useAppDispatch();
  const deleteAddress = async () => {
    const doesUserWantToDeleteAddress = confirm(
      `Are you sure you want to delete ${fullName} address?`
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
    <div className="flex aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-col rounded border-2 border-gray-200 p-3 hover:border-gray-500">
      <h2 className="text-lg font-medium">{fullName}</h2>
      <h3 className="text-xs text-gray-500">{contactNo}</h3>
      <div className="text-sm text-gray-500">
        {landmark} {nearBy} {city} {state} {pincode}
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
