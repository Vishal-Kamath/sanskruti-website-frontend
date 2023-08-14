"use client";

import Container from "@/app/user/components/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC, useState } from "react";
import { AddressComponent } from "../components/addressComponent";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import UIButton from "@/components/common/button";

const AddressPage: FC = () => {
  const user = useAppSelector(selectUser);
  const [search, setSearch] = useState("");

  const address =
    user.address &&
    user.address.filter((addr) =>
      addr.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  return (
    <Container containerTitle="Address">
      <div className="flex h-full flex-col gap-3">
        <div className="flex gap-3">
          <div className="text-md flex h-9 w-full items-center gap-1 rounded-md border-2 border-gray-300 bg-slate-50 px-2 text-gray-400 focus-within:border-gray-600 focus-within:text-gray-600">
            <AiOutlineSearch className="aspect-sqaure text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full border-none bg-transparent outline-none"
              placeholder="Search for past orders"
            />
          </div>
          <Link href="/user/address/add">
            <UIButton className="flex h-9 w-[10rem] items-center justify-center border-sanskrutiRed text-sanskrutiRed hover:outline-sanskrutiRedLight">
              Add a new address
            </UIButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {address && address.length ? (
            address.map((address) => (
              <AddressComponent key={address.id} {...address} />
            ))
          ) : user.address && user.address.length ? (
            <div className="col-span-full mt-5 text-center text-lg font-normal">
              <span>No addresses found</span>
            </div>
          ) : (
            <div className="col-span-full mt-5 text-center text-lg font-normal">
              <span>Address list empty. Add a new address to get started</span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AddressPage;
