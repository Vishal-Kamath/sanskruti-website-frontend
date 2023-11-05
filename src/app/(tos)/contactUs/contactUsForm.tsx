"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import { FC, MouseEvent, useState } from "react";

const ContactUsForm: FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !tel.trim() || !review.trim()) {
      dispatch(
        setNotification({
          message: "Please fill all details",
          type: "warning",
        })
      );
      dispatch(showNotification());
      return;
    }
  };

  return (
    <form className="flex flex-col gap-3">
      <Input
        input_type="text"
        placeholder="*Full Name"
        value={name}
        setValue={setName}
        className="rounded-md bg-white"
      />
      <Input
        input_type="email"
        placeholder="*Email"
        value={email}
        setValue={setEmail}
        className="rounded-md bg-white"
      />
      <Input
        input_type="tel"
        placeholder="*Telephone"
        value={tel}
        setValue={setTel}
        className="rounded-md bg-white"
      />

      <div className="group relative w-full rounded-md bg-white">
        <label
          htmlFor="review"
          className={cn(
            "absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black",
            !!review ? "top-0 text-xs" : "top-6 text-sm"
          )}
        >
          Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="peer h-[10rem] w-full resize-none rounded-md border-[1px] border-gray-400 bg-transparent px-3 py-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
        />
      </div>

      <UIButton
        type="submit"
        className="ml-auto mt-6 bg-black px-12 font-bold text-white"
        onClick={handleSubmit}
      >
        SUBMIT
      </UIButton>
    </form>
  );
};

export default ContactUsForm;
