"use client";

import { FC } from "react";
import { Review } from "./productReview";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewComponent: FC<Review> = ({ username, rating, title, comment }) => {
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
