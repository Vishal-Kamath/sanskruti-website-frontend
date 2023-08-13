"use client";

import { selectisAuthenticated } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import { usePathname, useRouter } from "next/navigation";
import { HTMLAttributes, FC, useEffect } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const UserLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return router.replace("/");
  }, [isAuthenticated]);

  const pathname = usePathname();
  const padding = pathname.includes("/user/account")
    ? "md:pt-24 pt-36"
    : "md:pt-28 pt-40 pb-10 px-[3vw]";

  return (
    <div
      className={cn(
        "mx-auto flex h-full min-h-screen w-full max-w-7xl gap-5 max-md:flex-col",
        padding
      )}
    >
      {children}
    </div>
  );
};

export default UserLayout;
