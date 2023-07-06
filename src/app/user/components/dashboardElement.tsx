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
    <div className="flex h-9 gap-1">
      <div
        className={cn("h-full w-1 rounded-full", isActive && "bg-sanskrutiRed")}
      ></div>
      <Link
        href={path || "#"}
        className={clsx(
          "flex h-full w-full items-center rounded-md px-3 text-left outline-none ",
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
