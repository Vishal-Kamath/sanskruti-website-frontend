import UIButton from "@/components/common/button";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-20 font-ysabeau text-black">
      <div className="relative flex flex-col justify-center min-h-[70vh] w-full px-5 sm:max-w-[30rem]">
        <Link href="/">
          <UIButton className="ml-auto h-9 gap-2 px-5 text-black">
            <BiArrowBack />
            <span>Back</span>
          </UIButton>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
