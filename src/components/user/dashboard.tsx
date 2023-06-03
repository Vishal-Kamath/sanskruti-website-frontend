"use client";

import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  dashboardTitle: string;
}
const DashboardContainer: FC<Props> = ({
  dashboardTitle,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-col gap-1 md:max-w-[20rem]",
        className
      )}
      {...props}
    >
      <h3 className="border-b-2 border-slate-400 rounded-md bg-slate-100 py-3 px-5 text-lg font-medium">
        {dashboardTitle}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default DashboardContainer;
