import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";
import { Ysabeau } from "next/font/google";

const ysabeau = Ysabeau({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--ysabeau-font",
});

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-white py-20 font-ysabeau text-black",
        ysabeau.variable
      )}
    >
      <div className="flex min-h-[70vh] w-full flex-col justify-center px-5 sm:max-w-[30rem]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
