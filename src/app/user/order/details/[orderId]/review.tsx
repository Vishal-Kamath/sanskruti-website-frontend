"use client";
import { Review } from "@/app/(product)/product/[productSlug]/components/review/productReview";
import UIButton from "@/components/common/button";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { selectUsername } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const UserReview: FC<{ product_id?: string }> = ({ product_id }) => {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const [reviewPosted, setReviewPosted] = useState(false);

  useEffect(() => {
    const fetchReview = () => {
      axios
        .get<{ userReview?: Review["reviews"][0] }>(
          `${process.env.ENDPOINT}/api/v1/user/userReview/${product_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const { userReview } = res.data;
          setReviewPosted(!!userReview);
          if (!userReview) return;

          setTitle(userReview.title);
          setComment(userReview.comment);
          setRating(userReview.rating);
        })
        .catch();
    };
    fetchReview();
  }, [product_id]);

  const submitReview = () => {
    if (!title.trim() || !comment.trim() || !rating) {
      dispatch(
        setNotification({
          message: "Fill All the field",
          content: "Please fill all the fields to a review",
          type: "warning",
        })
      );
      dispatch(showNotification());
      return;
    }

    axios
      .post<NotificationType & { userReviw: Review }>(
        `${process.env.ENDPOINT}/api/v1/user/review`,
        {
          product_id,
          comment,
          rating,
          title,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          setNotification({
            message: res.data.message,
            content: res.data.content,
            type: res.data.type,
          })
        );
        dispatch(showNotification());
        setReviewPosted(true);
        return;
      })
      .catch((err) => {
        dispatch(
          setNotification({
            message: err.response.data.message,
            content: err.response.data.content,
            type: err.response.data.type,
          })
        );
        dispatch(showNotification());
        return;
      });
  };

  const editReview = () => {
    if (!title.trim() || !comment.trim() || !rating) {
      dispatch(
        setNotification({
          message: "Fill All the field",
          content: "Please fill all the fields to a review",
          type: "warning",
        })
      );
      dispatch(showNotification());
      return;
    }

    axios
      .put<NotificationType & { userReviw: Review }>(
        `${process.env.ENDPOINT}/api/v1/user/review`,
        {
          product_id,
          comment,
          rating,
          title,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          setNotification({
            message: res.data.message,
            content: res.data.content,
            type: res.data.type,
          })
        );
        dispatch(showNotification());
        return;
      })
      .catch((err) => {
        dispatch(
          setNotification({
            message: err.response.data.message,
            content: err.response.data.content,
            type: err.response.data.type,
          })
        );
        dispatch(showNotification());
        return;
      });
  };

  const deleteReview = () => {
    const doesUserWantToDeleteReview = confirm(
      "Are you sure you want to delete this review?"
    );
    if (!doesUserWantToDeleteReview) return;

    axios
      .delete<NotificationType & { userReviw: Review }>(
        `${process.env.ENDPOINT}/api/v1/user/userReview/${product_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          setNotification({
            message: res.data.message,
            content: res.data.content,
            type: res.data.type,
          })
        );
        dispatch(showNotification());
        setTitle("");
        setComment("");
        setRating(5);
        setReviewPosted(false);
        return;
      })
      .catch((err) => {
        dispatch(
          setNotification({
            message: err.response.data.message,
            content: err.response.data.content,
            type: err.response.data.type,
          })
        );
        dispatch(showNotification());
        return;
      });
  };

  return (
    <div className="flex flex-col gap-3 rounded-md border-[1px] border-gray-300 px-3 py-6 md:gap-6 lg:px-6 lg:py-9">
      <h4 className="col-span-full w-full border-b-[1px] border-gray-300 pb-3 text-[16px] font-semibold md:pb-6">
        User Review
      </h4>
      <div className="flex w-full items-start justify-between gap-6">
        <label htmlFor="title" className="text-sm font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-md rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none focus-within:border-gray-700"
        />
      </div>
      <div className="flex w-full items-start justify-between gap-6">
        <label htmlFor="title" className="text-sm font-semibold">
          Rating:
        </label>
        <div className="flex w-full max-w-md gap-3">
          {[1, 2, 3, 4, 5].map((rate) =>
            rate <= rating ? (
              <AiFillStar
                key={rate}
                className="h-8 w-8 cursor-pointer text-yellow-300"
                onClick={() => setRating(rate)}
              />
            ) : (
              <AiOutlineStar
                key={rate}
                className="h-8 w-8 cursor-pointer text-gray-300"
                onClick={() => setRating(rate)}
              />
            )
          )}
        </div>
      </div>
      <div className="flex w-full items-start justify-between gap-6">
        <label htmlFor="comment" className="text-sm font-semibold">
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="max-h-36 min-h-[2.25rem] w-full max-w-md rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none focus-within:border-gray-700"
        />
      </div>

      <div className="flex w-full justify-end gap-3">
        {reviewPosted && (
          <UIButton
            className="w-fit rounded-md border-[1px] border-gray-300 px-6 text-gray-500 hover:border-red-500 hover:bg-red-500 hover:text-white hover:outline-red-100"
            onClick={deleteReview}
          >
            Delete
          </UIButton>
        )}
        <UIButton
          className="w-fit rounded-md border-[1px] border-gray-300 px-6 text-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white hover:outline-sky-100"
          onClick={() => (reviewPosted ? editReview() : submitReview())}
        >
          {reviewPosted ? "Edit" : "Post"}
        </UIButton>
      </div>
    </div>
  );
};

export default UserReview;
