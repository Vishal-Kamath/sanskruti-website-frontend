"use client";

import { FC, Fragment, useEffect, useState } from "react";
import { Review } from "./productReview";
import { useAppSelector } from "@/redux/store/hooks";
import {
  selectUsername,
  selectisAuthenticated,
} from "@/redux/slice/user.slice";
import { usePathname } from "next/navigation";
import { BiCommentDetail } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { cn } from "@/utils/lib";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import UIButton from "@/components/common/button";
import Link from "next/link";
import { UserReviewComponenet } from "./reviewComponent";

const UserReviewContainer: FC<{
  userReview: Review["reviews"][0] | undefined;
  handlePostReview: (
    comment: string,
    username: string,
    title: string,
    rating: number
  ) => Promise<boolean>;
  handleUpdateReview: (
    comment: string,
    username: string,
    title: string,
    rating: number
  ) => Promise<boolean>;
  handleDeleteReview: () => Promise<void>;
}> = ({
  userReview,
  handlePostReview,
  handleUpdateReview,
  handleDeleteReview,
}) => {
  const userIsAuthenticated = useAppSelector(selectisAuthenticated);
  const username = useAppSelector(selectUsername);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (
      userReview &&
      userReview.id &&
      userReview.username &&
      userReview.comment &&
      userReview.rating &&
      userReview.title
    ) {
      setTitle(userReview.title);
      setRating(userReview.rating);
      setComment(userReview.comment);
    }
  }, [
    userReview?.id,
    userReview?.username,
    userReview?.comment,
    userReview?.rating,
    userReview?.title,
  ]);

  const pathname = usePathname();

  return userIsAuthenticated ? (
    userReview ? (
      <Fragment>
        <UserReviewComponenet
          username={userReview.username}
          title={userReview.title}
          id={userReview.id}
          rating={userReview.rating}
          comment={userReview.comment}
          setOpen={setOpen}
          handleDeleteReview={handleDeleteReview}
        />
        <div
          className={cn(
            "fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-black bg-opacity-30 p-[3vw]",
            !open && "hidden"
          )}
        >
          <div className="relative flex w-full max-w-md flex-col items-start gap-6 rounded-lg bg-white p-8">
            <RxCross1
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
            />
            <h3 className="w-full text-center text-xl font-bold">UPDATE</h3>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">TITLE</h4>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 w-full rounded-md border-[1px] border-gray-400 px-1 outline-none focus-within:border-gray-600"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">RATING</h4>
              <div className="flex w-full items-center justify-start gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value + " review button"}
                    className="outline-none"
                    onClick={() => setRating(value)}
                  >
                    {value <= rating ? (
                      <AiFillStar
                        key={value + " customer review"}
                        className="h-8 w-8 text-yellow-300"
                      />
                    ) : (
                      <AiOutlineStar
                        key={value + " customer review"}
                        className="h-8 w-8 text-gray-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">COMMENT</h4>
              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="max-h-[12.5rem] w-full rounded-md border-[1px] border-gray-400 p-3 outline-none focus-within:border-gray-600"
              ></textarea>
            </div>

            <UIButton
              onClick={async () => {
                const close = await handleUpdateReview(
                  comment,
                  username!,
                  title,
                  rating
                );
                if (close) setOpen(false);
              }}
              className="ml-auto w-fit border-[1px] border-gray-300 px-5 hover:border-sky-500 hover:bg-sky-50 hover:outline-slate-50"
            >
              UPDATE
            </UIButton>
          </div>
        </div>
      </Fragment>
    ) : (
      <div>
        <button
          className="ml-auto flex gap-2 border-b-[1px] border-transparent bg-none pb-1 text-sanskrutiRed outline-none hover:border-sanskrutiRed"
          onClick={() => setOpen(true)}
        >
          <BiCommentDetail />
          <span>LEAVE A REVIEW</span>
        </button>
        <div
          className={cn(
            "fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-black bg-opacity-30 p-[3vw]",
            !open && "hidden"
          )}
        >
          <div className="relative flex w-full max-w-md flex-col items-start gap-6 rounded-lg bg-white p-8">
            <RxCross1
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
            />
            <h3 className="w-full text-center text-xl font-bold">REVIEW</h3>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">TITLE</h4>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 w-full rounded-md border-[1px] border-gray-400 px-1 outline-none focus-within:border-gray-600"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">RATING</h4>
              <div className="flex w-full items-center justify-start gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value + " review button"}
                    className="outline-none"
                    onClick={() => setRating(value)}
                  >
                    {value <= rating ? (
                      <AiFillStar
                        key={value + " customer review"}
                        className="h-8 w-8 text-yellow-300"
                      />
                    ) : (
                      <AiOutlineStar
                        key={value + " customer review"}
                        className="h-8 w-8 text-gray-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <h4 className="w-full text-[16px]">COMMENT</h4>
              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="max-h-[12.5rem] w-full rounded-md border-[1px] border-gray-400 p-3 outline-none focus-within:border-gray-600"
              ></textarea>
            </div>

            <UIButton
              onClick={async () => {
                const close = await handlePostReview(
                  comment,
                  username!,
                  title,
                  rating
                );
                if (close) setOpen(false);
              }}
              className="ml-auto w-fit border-[1px] border-gray-300 px-5 hover:border-sky-500 hover:bg-sky-50 hover:outline-slate-50"
            >
              POST
            </UIButton>
          </div>
        </div>
      </div>
    )
  ) : (
    <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
      <UIButton className="w-full max-w-sm border-[1px] border-gray-300 py-3 hover:border-sky-300 hover:bg-sky-50 hover:outline-slate-50">
        Sign in to leave a Comment
      </UIButton>
    </Link>
  );
};

export default UserReviewContainer;
