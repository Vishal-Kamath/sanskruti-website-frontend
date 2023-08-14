"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import UserReviewContainer from "./userReviewContainer";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import ReviewComponent from "./reviewComponent";

export type Review = {
  product_id: string;
  totalRatings: number;
  reviews: {
    id: string;
    username: string;
    title: string;
    comment: string;
    rating: number;
  }[];
  ratingCounts: {
    [key: number]: number;
  };
};

const ProductReview: FC<{ id: string }> = ({ id }) => {
  const userIsAuthenticated = useAppSelector(selectisAuthenticated);
  const dispatch = useAppDispatch();

  const [reviews, setReviews] = useState<Review>();
  const [userReview, setUserReview] = useState<Review["reviews"][0]>();

  const fetchReview = () => {
    axios
      .get<{ reviews: Review }>(
        `${process.env.ENDPOINT}/api/v1/user/reviews/${id}`
      )
      .then((res) => {
        const response = res.data;
        setReviews(response.reviews);
      })
      .catch();
  };

  const fetchUserReview = () => {
    axios
      .get<{ userReview: Review["reviews"][0]; reviews: Review }>(
        `${process.env.ENDPOINT}/api/v1/user/userReview/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        setReviews(response.reviews);
        setUserReview(response.userReview);
      })
      .catch();
  };
  useEffect(() => {
    if (userIsAuthenticated) fetchUserReview();
    else fetchReview();
  }, [userIsAuthenticated]);

  const handlePostReview = async (
    comment: string,
    username: string,
    title: string,
    rating: number
  ) => {
    if (!comment.trim() || !username || !rating || !title.trim()) {
      dispatch(
        setNotification({
          message: "please fill all details before you post a comment",
          type: "info",
        })
      );
      dispatch(showNotification());
      return false;
    }

    try {
      const response = (
        await axios.post<{
          reviews: Review;
          userReview: Review["reviews"][0];
        }>(
          `${process.env.ENDPOINT}/api/v1/user/review`,
          {
            product_id: id,
            username,
            title,
            rating,
            comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
      ).data;
      setReviews(response.reviews);
      setUserReview(response.userReview);
      return true;
    } catch (err) {
      return false;
    }
  };
  const handleUpdateReview = async (
    comment: string,
    username: string,
    title: string,
    rating: number
  ) => {
    if (!comment.trim() || !username || !rating || !title.trim()) {
      dispatch(
        setNotification({
          message: "please fill all details before you post a comment",
          type: "info",
        })
      );
      dispatch(showNotification());
      return false;
    }

    try {
      const response = (
        await axios.put<{
          reviews: Review;
          userReview: Review["reviews"][0];
        }>(
          `${process.env.ENDPOINT}/api/v1/user/review`,
          {
            product_id: id,
            username,
            title,
            rating,
            comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
      ).data;
      setReviews(response.reviews);
      setUserReview(response.userReview);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleDeleteReview = async () => {
    const confirmIfUserWantsToDelete = confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmIfUserWantsToDelete) return;

    try {
      const response = (
        await axios.delete<
          NotificationType & {
            reviews: Review;
          }
        >(
          `${process.env.ENDPOINT}/api/v1/user/userReview/${id}?userId=${userReview?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
      ).data;
      dispatch(
        setNotification({
          message: response.message,
          type: response.type,
        })
      );
      dispatch(showNotification());
      setReviews(response.reviews);
      setUserReview(undefined);
    } catch (err) {
      return;
    }
  };

  const total = reviews && reviews.totalRatings ? reviews.totalRatings : 0;

  console.log(total);
  const ratingAverage =
    reviews && reviews?.ratingCounts && total
      ? (
          (5 * reviews?.ratingCounts[5] +
            4 * reviews?.ratingCounts[4] +
            3 * reviews?.ratingCounts[3] +
            2 * reviews?.ratingCounts[2] +
            reviews?.ratingCounts[1]) /
          total
        ).toFixed(1)
      : "NA";

  return (
    <div className="flex w-full flex-col gap-5">
      <h3 className="flex items-center gap-1 text-lg font-bold">
        <span>RATINGS</span>
        <AiOutlineStar className="h-5 w-5 text-yellow-300" />
      </h3>

      <div className="my-6 flex items-center justify-between gap-12">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl">{ratingAverage}</h2>
            <AiFillStar className="h-6 w-6 text-green-500" />
          </div>
          <span>
            Rated by {total > 1000 ? `${(total / 1000).toFixed(1)}k` : total}{" "}
            users
          </span>
        </div>

        <div className="h-[6rem] w-[1px] bg-gray-400"></div>

        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((value) => (
            <div key={value + id} className="flex items-center gap-2">
              <span>{value}</span>

              <div className="flex h-1 w-[10rem] justify-start overflow-hidden rounded-full bg-gray-300">
                <div
                  style={{
                    width:
                      total && reviews && reviews.ratingCounts
                        ? `${(reviews?.ratingCounts[value] / total) * 100}%`
                        : 0,
                  }}
                  className="rounded-full bg-yellow-300"
                ></div>
              </div>
              <span>
                {reviews && reviews.ratingCounts && reviews.ratingCounts[value]
                  ? reviews?.ratingCounts[value]
                  : 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="border-b-[1px] border-gray-300 pb-3 text-[16px]">
        CUSTOMER REVIEWS
      </h3>
      <UserReviewContainer
        userReview={userReview}
        handlePostReview={handlePostReview}
        handleUpdateReview={handleUpdateReview}
        handleDeleteReview={handleDeleteReview}
      />
      {reviews?.reviews && reviews.reviews.length ? (
        <div className="flex flex-col gap-2">
          {reviews.reviews.map((review, index) => (
            <ReviewComponent key={index + review.username} {...review} />
          ))}
        </div>
      ) : (
        !userReview && (
          <div className="flex flex-col items-center justify-center gap-1 text-[16px]">
            <div className="flex gap-1">
              <AiFillStar className="text-gray-300" />
              <AiFillStar className="text-gray-300" />
              <AiFillStar className="text-gray-300" />
              <AiFillStar className="text-gray-300" />
              <AiFillStar className="text-gray-300" />
            </div>
            <span>Be the first to leave a review!!!</span>
          </div>
        )
      )}
    </div>
  );
};

export default ProductReview;
