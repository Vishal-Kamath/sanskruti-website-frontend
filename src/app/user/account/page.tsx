"use client";

import UIButton from "@/components/common/button";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import Image from "next/image";
import EditProfileComponent from "./component/editProfile";
import { cn } from "@/utils/lib";
import ChangePasswordComponent from "./component/changePassword";
import CouponComponent from "./component/couponComponent";
import SwiperContainer from "@/components/common/swiperContainer";
import { SwiperSlide } from "swiper/react";

export interface Coupon {
  code: string;
  type: "oneTime" | "multiple";
  discountType: "percentage" | "price";
  value: number;
  minPurchase: number;
  expirationDate: Date;
  usedBy: string[];
}

const DetailsPage: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [coupons, setCoupons] = useState<Coupon[]>();

  const _requestEmailVerification = () => {
    axios
      .get<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/verifyEmail?email=${user.email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
  };

  const Initials = user.username
    ? user.username
        .split(" ")
        .map((name) => name[0].toLocaleUpperCase())
        .slice(0, 2)
        .join("")
    : "G";

  const imageSrc = `/assets/rangoli/rangoli-${
    Math.floor(Math.random() * 4) + 1
  }.png`;

  const fetchCoupons = async () => {
    axios
      .get<{ coupons: Coupon[] }>(
        `${process.env.ENDPOINT}/api/v1/user/coupons`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setCoupons(res.data.coupons);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col md:border-x-[1px] md:border-gray-300">
      {/* Backeground Image */}
      <div className="relative isolate h-[12.5rem] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt="rangoli image"
          width={300}
          height={300}
          className="absolute bottom-0 left-[6rem] z-20 h-[25rem] w-[25rem] -translate-x-1/2 translate-y-1/2"
        />
        <Image
          src={imageSrc}
          alt="rangoli image"
          width={300}
          height={300}
          className="absolute left-0 top-0 z-10 aspect-square w-[30rem] -translate-x-1/3 -translate-y-1/2 blur-sm"
        />
        <Image
          src={imageSrc}
          alt="rangoli image"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 z-0 aspect-square w-[30rem] translate-x-1/4 translate-y-1/2 blur-md sm:w-full"
        />
      </div>
      <div className="relative pt-[5.5rem]">
        <div className="absolute left-[6rem] top-0 flex h-[9rem] w-[9rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1px] border-sky-950 bg-sky-100 text-4xl text-sky-950 outline outline-8 outline-white">
          {Initials}
        </div>

        <EditProfileComponent
          className="absolute right-5 top-5"
          emailprop={user.email}
          mobileprop={user.Mobile_No}
          usernameprop={user.username}
        />

        <div className="flex flex-col gap-2 border-b-[1px] border-gray-300 px-6 pb-5">
          <span className="text-2xl font-semibold">{user.username}</span>
          <div
            className={cn(
              "flex items-center gap-3",
              user.email_verified
                ? "font-medium text-gray-800"
                : "text-gray-400"
            )}
          >
            <span>{user.email}</span>
            {!user.email_verified && (
              <span className="rounded-full border-[1px] border-gray-400 px-3 py-1 text-xs">
                Not Verified
              </span>
            )}
          </div>
          <div
            className={cn(
              "flex items-center gap-3",
              user.Mobile_No_verified
                ? "font-medium text-gray-800"
                : "text-gray-400"
            )}
          >
            <span>+{user.Mobile_No}</span>
            {!user.Mobile_No_verified && (
              <span className="rounded-full border-[1px] border-gray-400 px-3 py-1 text-xs">
                Not Verified
              </span>
            )}
          </div>
        </div>

        {(!user.Mobile_No_verified || !user.email_verified) && (
          <div className="flex w-full gap-6 px-6 py-5 max-sm:flex-col">
            {!user.email_verified && (
              <div className="flex h-full w-full max-w-lg flex-col gap-4">
                <h4 className="border-b-[1px] border-gray-600 pb-2 text-lg text-gray-600">
                  Verify Email
                </h4>
                <p className="text-justify text-sm text-gray-400">
                  It appears that your email is not verified. Please click the
                  button below to request an email verification link. (Please
                  note this link will only be valid for the next 15 minutes)
                </p>
                <UIButton
                  onClick={_requestEmailVerification}
                  className="ml-auto mt-auto w-fit rounded-full border-[1px] border-gray-600 px-3 text-gray-600 hover:border-sanskrutiRed hover:text-sanskrutiRed hover:outline-sanskrutiRedLight"
                >
                  Send Verification Email
                </UIButton>
              </div>
            )}
            {!user.Mobile_No_verified && (
              <div className="flex h-full w-full max-w-lg flex-col gap-4">
                <h4 className="border-b-[1px] border-gray-600 pb-2 text-lg text-gray-600">
                  Verify Mobile Number
                </h4>
                <p className="text-justify text-sm text-gray-400">
                  It appears that your mobile number is not verified. Please
                  click the button below to request an OTP. (Please note this
                  OTP will only be valid for the next 15 minutes)
                </p>
                <UIButton className="ml-auto mt-auto w-fit rounded-full border-[1px] border-gray-600 px-3 text-gray-600 hover:border-sanskrutiRed hover:text-sanskrutiRed hover:outline-sanskrutiRedLight">
                  Send Verification OTP
                </UIButton>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 px-6 py-5">
          <h4 className="border-b-[1px] border-gray-600 pb-2 text-lg text-gray-600">
            Coupons
          </h4>
          {coupons && coupons?.length ? (
            <SwiperContainer
              className="w-full"
              slidesPerView={3}
              spaceBetween={10}
              modules={[]}
            >
              {coupons.map((coupon, index) => (
                <SwiperSlide className="w-full" key={coupon.code + index}>
                  <CouponComponent {...coupon} />
                </SwiperSlide>
              ))}
            </SwiperContainer>
          ) : (
            <span className="w-full text-center">No Coupons found</span>
          )}
        </div>

        <div className="flex w-full max-w-lg flex-col gap-4 px-6 py-5">
          <h4 className="border-b-[1px] border-gray-600 pb-2 text-lg text-gray-600">
            Security
          </h4>
          <p className="text-justify text-sm text-gray-400">
            Please note that it&apos;s essential to regularly update your
            password for increased security. Remember to choose a strong, unique
            combination of characters, numbers, and symbols. Stay proactive and
            safeguard your account by changing your password periodically.
          </p>
          <ChangePasswordComponent className="ml-auto w-fit" />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
