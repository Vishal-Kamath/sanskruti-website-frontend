"use client";

import { FC, useState } from "react";
import { Review } from "./productReview";
import { AiFillStar, AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { GrUpdate } from "react-icons/gr";
import { cn } from "@/utils/lib";

const ReviewComponent: FC<Review["reviews"][0]> = ({
  username,
  rating,
  title,
  comment,
}) => {
  const Initials = username
    .split(" ")
    .map((name) => name[0].toLocaleUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="flex gap-3 border-b-[1px] border-gray-200 p-5 text-[16px]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-lg text-slate-700">
        {Initials}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span>{username}</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) =>
              value <= rating ? (
                <AiFillStar
                  key={value + username}
                  className="text-yellow-300"
                />
              ) : (
                <AiOutlineStar
                  key={value + username}
                  className="text-gray-400"
                />
              )
            )}
          </div>
        </div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewComponent;

export const UserReviewComponenet: FC<
  Review["reviews"][0] & {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteReview: () => Promise<void>;
  }
> = ({ username, rating, title, comment, setOpen, handleDeleteReview }) => {
  const Initials = username
    .split(" ")
    .map((name) => name[0].toLocaleUpperCase())
    .slice(0, 2)
    .join("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex gap-3 rounded-sm border-[1px] border-gray-200 p-5 text-[16px]">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-lg text-slate-700">
        {Initials}
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <span>{username}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) =>
                value <= rating ? (
                  <AiFillStar
                    key={value + username}
                    className="text-yellow-300"
                  />
                ) : (
                  <AiOutlineStar
                    key={value + username}
                    className="text-gray-400"
                  />
                )
              )}
            </div>
          </div>
          <button
            className="relative h-6 w-6 flex-shrink-0"
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <BsThreeDotsVertical className="h-6 w-6 rounded-full p-1 hover:cursor-pointer hover:bg-gray-50" />
            <div
              className={cn(
                "absolute right-0 top-7 w-[12rem] rounded-md border-[1px] border-gray-300 bg-white text-sm shadow-lg",
                !dropdownOpen && "hidden"
              )}
            >
              <div
                onClick={() => {
                  setOpen(true);
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center gap-3 p-3 hover:bg-sky-100"
              >
                <GrUpdate className="h-3 w-3" /> Update Review
              </div>
              <div
                onClick={async () => {
                  setDropdownOpen(false);
                  await handleDeleteReview();
                }}
                className="flex w-full items-center gap-3 border-b-[1px] border-gray-300 p-3 hover:bg-red-100"
              >
                <AiOutlineDelete className="h-4 w-4" /> Delete Review
              </div>
            </div>
          </button>
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};
