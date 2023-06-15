import { cn } from "@/utils/lib";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-white py-20 text-black"
      )}
    >
      <div className="flex min-h-[70vh] w-full flex-col justify-center px-5 sm:max-w-[30rem]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
