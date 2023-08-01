"use client";

import { selectisAuthenticated } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { useRouter } from "next/navigation";
import { HTMLAttributes, FC, useEffect } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const UserLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return router.replace("/");
  }, [isAuthenticated]);

  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-7xl gap-5 px-[3vw] pb-10 pt-40 max-md:flex-col md:pt-28">
      {children}
    </div>
  );
};

export default UserLayout;
