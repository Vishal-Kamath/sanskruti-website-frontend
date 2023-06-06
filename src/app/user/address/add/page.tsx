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
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-lg">
        <Input
          input_type="text"
          placeholder="Full Name"
          setValue={setfullName}
          value={fullName}
        />
        <Input
          input_type="number"
          placeholder="Contact No"
          setValue={setcontactNo}
          value={contactNo}
        />
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
          className="ml-auto w-full bg-sky-100 hover:outline-sky-200"
        >
          SUBMIT
        </UIButton>
      </div>
    </Container>
  );
};

export default AddAddressPage;
