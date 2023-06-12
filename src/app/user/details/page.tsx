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
      <div className="mt-4 flex w-full flex-col gap-6">
        <div className="text-justify text-gray-500">
          Ensure your profile information is accurate and up-to-date.
          Periodically review and update your details to ensure relevancy.
          Keeping your profile information current helps us provide you with a
          better user experience. Stay connected with the latest updates!
        </div>
        <div className="flex items-center gap-7 text-sm max-lg:flex-col max-lg:items-center">
          <BsPerson className="aspect-square h-[10rem] w-full shrink-0 rounded-[2rem] border-2 border-slate-300 bg-slate-50 p-9 text-sky-400 lg:h-[15rem] lg:w-[15rem]" />
          <div className="flex w-full flex-col gap-1 text-sm md:text-lg">
            <div className="flex justify-between">
              <h4 className="font-normal">Username</h4>
              <div className="text-gray-500">{user.username}</div>
            </div>
            <div className="flex justify-between">
              <h4 className="font-normal">Email</h4>
              <div className="text-gray-500">{user.email}</div>
            </div>
            <div className="flex justify-between">
              <h4 className="font-normal">Mobile Number</h4>
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
      </div>
    </Container>
  );
};

export default DetailsPage;
