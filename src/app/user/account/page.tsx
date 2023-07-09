"use client";

import UIButton from "@/components/common/button";
import Container from "@/app/user/components/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";

const DetailsPage: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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

  return (
    <div className="flex flex-col gap-6">
      <Container containerTitle="Account">
        <div className="mt-4 flex w-full flex-col gap-6">
          <div className="text-justify text-gray-500">
            Ensure your profile information is accurate and up-to-date.
            Periodically review and update your details to ensure relevancy.
            Keeping your profile information current helps us provide you with a
            better user experience. Stay connected with the latest updates!
          </div>
          <div className="flex items-center gap-7 text-sm max-md:flex-col max-md:items-center">
            <BsPerson className="aspect-square h-[10rem] w-full shrink-0 rounded-[1rem] border-2 border-slate-300 bg-slate-50 p-9 text-sky-400 md:h-[15rem] md:w-[15rem]" />
            <div className="flex h-full w-full flex-col gap-1 text-sm md:text-lg">
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
              <Link
                href="/user/account/edit"
                className="ml-auto mt-auto w-full max-w-[15rem]"
              >
                <UIButton className="flex w-full gap-2 border-sky-300 bg-sky-50 text-sm hover:outline-sky-100">
                  <span>EDIT PROFILE</span>
                  <AiFillEdit />
                </UIButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {!user.email_verified && (
          <Container containerTitle="Email Verification" className="h-full">
            <div className="flex h-full flex-col gap-4">
              <div className="text-justify text-sm text-gray-500">
                It appears that your email is not verified. Please click the
                button below to request an email verification link. (Please note
                this link will only be valid for the next 15 minutes)
              </div>
              <UIButton
                className="ml-auto mt-auto w-full max-w-[15rem] border-sky-300 bg-sky-50 hover:outline-sky-100"
                onClick={_requestEmailVerification}
              >
                SEND VERIFICATION LINK
              </UIButton>
            </div>
          </Container>
        )}
        {!user.Mobile_No_verified && (
          <Container
            containerTitle="Mobile Number Verification"
            className="h-full"
          >
            <div className="flex h-full flex-col gap-4">
              <div className="text-justify text-sm text-gray-500">
                It appears that your mobile number is not verified. Please click
                the button below to request an OTP. (Please note this OTP will
                only be valid for the next 15 minutes)
              </div>
              <UIButton className="ml-auto mt-auto w-full max-w-[15rem] border-sky-300 bg-sky-50 hover:outline-sky-100">
                SEND OTP
              </UIButton>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
