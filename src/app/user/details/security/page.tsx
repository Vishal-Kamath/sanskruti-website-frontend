"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import Container from "@/components/user/container";
import { FC, useState } from "react";

const SecurityPage: FC = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  return (
    <Container containerTitle="Security">
      <form className="flex flex-col gap-6 w-full max-w-lg">
        <div className="flex flex-col w-full gap-2">
          <span className="shrink-0 text-lg">Your old password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <span className="shrink-0 text-lg">Your new password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={newPassword}
            setValue={setNewPassword}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <span className="shrink-0 text-lg">Confirm new password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
          />
        </div>

        <UIButton className="ml-auto w-fit px-16 bg-sky-100 hover:outline-sky-200">
          SUBMIT
        </UIButton>
      </form>
    </Container>
  );
};

export default SecurityPage;
