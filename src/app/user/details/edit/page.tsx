"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import Container from "@/components/user/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC, useState } from "react";

const EditProfile: FC = () => {
  const user = useAppSelector(selectUser);

  const [username, setUsername] = useState(user.username);
  const [mobileNumber, setMobileNumber] = useState(user.Mobile_No);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Container containerTitle="Edit Profile Details">
        <form className="flex flex-col gap-6 w-full max-w-lg">
          <div className="flex flex-col w-full gap-2">
            <span className="shrink-0 text-lg">Update username:</span>
            <Input
              input_type="text"
              placeholder=""
              value={username}
              setValue={setUsername}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <span className="shrink-0 text-lg">Update email:</span>
            <Input
              input_type="text"
              placeholder=""
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <span className="shrink-0 text-lg">Update mobile number:</span>
            <Input
              input_type="text"
              placeholder=""
              value={mobileNumber}
              setValue={setMobileNumber}
            />
          </div>

          <UIButton className="ml-auto w-fit px-16 bg-sky-100 hover:outline-sky-200">
            SUBMIT
          </UIButton>
        </form>
      </Container>
    </div>
  );
};

export default EditProfile;
