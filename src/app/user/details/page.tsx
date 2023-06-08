"use client";

import UIButton from "@/components/common/button";
import Container from "@/app/user/components/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const DetailsPage: FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Container containerTitle="User Details">
      <div className="flex gap-3 text-lg max-md:flex-col">
        <BsPerson className="aspect-square h-full w-full shrink-0 rounded-md border-2 border-slate-300 bg-slate-50 p-3 text-sky-400 md:h-[15rem] md:w-[15rem]" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex justify-between">
            <h4 className="font-semibold">Username</h4>
            <div className="text-gray-500">{user.username}</div>
          </div>
          <div className="flex justify-between">
            <h4 className="font-semibold">Email</h4>
            <div className="text-gray-500">{user.email}</div>
          </div>
          <div className="flex justify-between">
            <h4 className="font-semibold">Mobile Number</h4>
            <div className="text-gray-500">{user.Mobile_No}</div>
          </div>
          <Link href="/user/details/edit" className="ml-auto mt-7">
            <UIButton className="flex w-fit items-center gap-1 border-gray-300 px-3 py-1 text-blue-500 hover:outline-blue-200">
              <span>Edit</span>
              <AiFillEdit />
            </UIButton>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
