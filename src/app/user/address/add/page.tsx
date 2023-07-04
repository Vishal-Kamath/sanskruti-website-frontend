"use client";

import { FC, useState } from "react";
import Container from "../../components/container";
import { Input } from "@/components/common/input";
import UIButton from "@/components/common/button";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { Address, setAddress } from "@/redux/slice/user.slice";
import { useRouter } from "next/navigation";
import z from "zod";
import PhoneInput from "react-phone-input-2";
import "@/app/high-res.css";

const AddAddressPage: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [fullName, setfullName] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [pincode, setpincode] = useState("");
  const [nearBy, setnearBy] = useState("");
  const [landmark, setlandmark] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");

  const validateTypes = (): { valid: boolean } & NotificationType => {
    const mobileNumberSchema = z
      .number()
      .refine((number) => number.toString().length > 10);
    try {
      mobileNumberSchema.parse(Number(contactNo));
    } catch {
      return {
        valid: false,
        message: "not a valid mobile number",
        type: "warning",
        content: `For mobile number, include the country code, like "911234567890".`,
      };
    }

    const pincodeSchema = z
      .number()
      .refine(
        (number) =>
          /^[1-9][0-9]{5}$/.test(number.toString()) &&
          number.toString().length === 6
      );
    try {
      pincodeSchema.parse(Number(pincode));
    } catch {
      return {
        valid: false,
        message: "Not a valid pincode",
        type: "warning",
        content:
          "According to indian standard, a valid pincode is a 6-digit number. example: 123456",
      };
    }

    return { valid: true, message: "", type: "info", content: "" };
  };

  const submit = async () => {
    if (
      !fullName.trim() ||
      !contactNo.trim() ||
      !pincode.trim() ||
      !nearBy.trim() ||
      !landmark.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      dispatch(
        setNotification({
          message: "fill all details",
          type: "warning",
          content:
            "We request the user to please fill all the required fields.",
        })
      );
      return dispatch(showNotification());
    }

    const { valid, message, type, content } = validateTypes();
    if (!valid) {
      dispatch(setNotification({ message, type, content }));
      return dispatch(showNotification());
    }

    await axios
      .post<NotificationType & { address: Address[] }>(
        `${process.env.ENDPOINT}/api/v1/user/address`,
        {
          fullName,
          contactNo: Number(contactNo),
          pincode: Number(pincode),
          nearBy,
          landmark,
          city,
          state,
        },
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
        dispatch(setAddress(response.address));
        router.push("/user/address");
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
    <Container containerTitle="Add New Address">
      <div className="mx-auto flex w-full flex-col gap-4 pt-6 md:max-w-lg">
        <Input
          input_type="text"
          placeholder="Full Name"
          setValue={setfullName}
          value={fullName}
        />
        <div className="relative h-fit w-full rounded-md hover:outline hover:outline-4 hover:outline-gray-300">
          <PhoneInput
            country={"in"}
            value={contactNo}
            onChange={setcontactNo}
          />
          <label
            id="mobileLabel"
            htmlFor="mobile"
            className="absolute left-3 top-0 z-10 -translate-y-1/2 bg-white px-2 text-xs"
          >
            Contact Number
          </label>
        </div>
        <Input
          input_type="text"
          placeholder="Landmark"
          setValue={setlandmark}
          value={landmark}
        />
        <Input
          input_type="text"
          placeholder="Near By"
          setValue={setnearBy}
          value={nearBy}
        />
        <Input
          input_type="text"
          placeholder="City"
          setValue={setcity}
          value={city}
        />
        <Input
          input_type="text"
          placeholder="State"
          setValue={setstate}
          value={state}
        />
        <Input
          input_type="number"
          placeholder="Pincode"
          setValue={setpincode}
          value={pincode}
        />
        <UIButton
          onClick={submit}
          className="ml-auto w-fit rounded-md border-none bg-sanskrutiRed px-5 text-white hover:outline-sanskrutiRedLight"
        >
          SUBMIT
        </UIButton>
      </div>
    </Container>
  );
};

export default AddAddressPage;
