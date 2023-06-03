"use client";

import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const DetailsPage: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="w-full h-fit flex flex-col gap-3 rounded-md">
      <h3 className="border-b-2 border-slate-300 rounded-md bg-slate-50 py-3 px-5 text-lg font-medium">
        User Details
      </h3>

      <div className="flex gap-3 text-lg">
        <BsPerson className="h-[15rem] w-[15rem] rounded-md bg-slate-50 p-3 text-sky-400 border-2 border-slate-300" />
        <div className="flex flex-col gap-1">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.Mobile_No}</div>
          <button className="mt-4 flex items-center w-fit gap-1 border-b-2 border-white text-sky-400 hover:border-sky-400">
            <span>Edit</span>
            <AiFillEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
