import UIButton from "@/components/common/button";
import { Address } from "@/redux/slice/user.slice";
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
  return (
    <div className="flex aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-col rounded border-2 border-gray-200 p-3 hover:border-gray-500">
      <h2 className="text-lg font-medium">{fullName}</h2>
      <h3 className="text-xs text-gray-500">{contactNo}</h3>
      <div className="text-sm text-gray-500">
        {landmark} {nearBy} {city} {state} {pincode}
      </div>
      <Link href={`/user/address/edit?id=${id}`} className="ml-auto mt-auto">
        <UIButton className="flex w-fit items-center gap-1 border-gray-300 px-3 py-1 text-blue-500 hover:outline-blue-200">
          <span>Edit</span>
          <AiFillEdit />
        </UIButton>
      </Link>
    </div>
  );
};
