"use client";

import { cn } from "@/utils/lib";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes } from "react";

interface ElementProps extends HTMLAttributes<HTMLAnchorElement> {
  path?: string;
}
export const DashboardElement: FC<ElementProps> = ({
  children,
  className,
  path,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <div className="flex gap-1 h-9">
      <div
        className={cn("h-full w-1 rounded-full", isActive && "bg-sky-400")}
      ></div>
      <Link
        href={path || "#"}
        className={clsx(
          "rounded-md px-3 w-full flex items-center h-full text-left outline-none ",
          isActive
            ? "bg-slate-100 font-medium hover:bg-slate-200"
            : "bg-white hover:bg-slate-100",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};
