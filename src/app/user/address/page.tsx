"use client";

import Container from "@/app/user/components/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import { AddressComponent } from "../components/addressComponent";
import { GrAdd } from "react-icons/gr";
import Link from "next/link";

const AddressPage: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <Container containerTitle="Address">
      <div className="flex gap-3">
        {user.address.map((address) => (
          <AddressComponent key={address.id} {...address} />
        ))}
        <Link
          href="/user/address/add"
          className="flex aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-col items-center justify-center rounded border-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50"
        >
          <GrAdd /> <span>Add a new address</span>
        </Link>
      </div>
    </Container>
  );
};

export default AddressPage;
