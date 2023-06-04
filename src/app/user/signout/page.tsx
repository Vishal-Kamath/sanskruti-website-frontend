"use client";

import { FC } from "react";
import Container from "../components/container";
import UIButton from "@/components/common/button";
import { useAppDispatch } from "@/redux/store/hooks";
import { useRouter } from "next/navigation";
import { loggedOut, setUser } from "@/redux/slice/user.slice";

const SignOutPage: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signout = () => {
    const doesTheUserWantToSignOut = confirm(
      "Are you sure you want to sign out?"
    );
    if (doesTheUserWantToSignOut) {
      dispatch(loggedOut());
      dispatch(setUser({ address: [] }));
      return router.replace("/");
    }
  };
  return (
    <Container containerTitle="Sign Out">
      <div className=" flex max-w-lg flex-col gap-4">
        <span className="text-gray-500">
          Are you sure you want to sign out? This action will log you out of
          your account and terminate your current session.
        </span>
        <UIButton
          onClick={signout}
          className="border-red-600 text-red-600 hover:outline-red-300"
        >
          SIGN OUT
        </UIButton>
      </div>
    </Container>
  );
};

export default SignOutPage;
