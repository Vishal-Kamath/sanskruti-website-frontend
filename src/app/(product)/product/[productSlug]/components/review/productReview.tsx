"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import ReviewComponent from "./reviewComponent";

export interface Review {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  username: string;
  title: string;
  rating: number;
  comment: string;
  status: "Under review" | "Accepted" | "Denied";
  notify: boolean;
}

interface ProductRating {
  product_id: string;
  totalRatings: number;
  ratingCounts: {
    [key: number]: number;
  };
}

const ProductReview: FC<{ id: string }> = ({ id }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<ProductRating>();

  const fetchReview = () => {
    axios
      .get<{ reviews: Review[]; productRating: ProductRating }>(
        `${process.env.ENDPOINT}/api/v1/user/reviews/${id}`
      )
      .then((res) => {
        const response = res.data;
        setReviews(response.reviews);
        setRating(response.productRating);
      })
      .catch();
  };
  useEffect(() => {
    fetchReview();
  }, []);

  const total = reviews && rating?.totalRatings ? rating.totalRatings : 0;

  const ratingAverage =
    reviews && rating?.ratingCounts && total
      ? (
          (5 * rating?.ratingCounts[5] +
            4 * rating?.ratingCounts[4] +
            3 * rating?.ratingCounts[3] +
            2 * rating?.ratingCounts[2] +
            rating?.ratingCounts[1]) /
          total
        ).toFixed(1)
      : "NA";

  return (
    <div className="flex w-full max-w-3xl flex-col gap-5 max-lg:mx-auto">
      <h3 className="text-lg font-bold">RATINGS</h3>

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
                      total && rating && rating.ratingCounts
                        ? `${(rating?.ratingCounts[value] / total) * 100}%`
                        : 0,
                  }}
                  className="rounded-full bg-yellow-300"
                ></div>
              </div>
              <span>
                {rating && rating.ratingCounts && rating.ratingCounts[value]
                  ? rating?.ratingCounts[value]
                  : 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="border-b-[1px] border-gray-300 pb-3 text-[16px]">
        CUSTOMER REVIEWS
      </h3>
      {reviews && reviews.length ? (
        <div className="flex flex-col gap-2">
          {reviews.map((review, index) => (
            <ReviewComponent key={index + review.username} {...review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 text-[16px]">
          <div className="flex gap-1">
            <AiFillStar className="text-gray-300" />
            <AiFillStar className="text-gray-300" />
            <AiFillStar className="text-gray-300" />
            <AiFillStar className="text-gray-300" />
            <AiFillStar className="text-gray-300" />
          </div>
          <span>No reviews here!!!</span>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
