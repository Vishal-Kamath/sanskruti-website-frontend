"use client";

import { cn } from "@/utils/lib";
import { FC } from "react";
import LoadingSpinner from "./loadingSpinner";

interface Props {
  className: string;
  src: string;
}
const UIGoogleMap: FC<Props> = ({ className, src }) => {
  try {
    return (
      <div
        className={cn("relative isolate overflow-hidden rounded-sm", className)}
      >
        <iframe
          src={src}
          className="h-full w-full"
          sandbox="allow-scripts"
        ></iframe>
        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center bg-slate-100">
          <LoadingSpinner />
        </div>
      </div>
    );
  } catch (err) {
    console.log("map error ", err);
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-sm border-[1px] border-red-500 bg-red-100 text-red-500",
          className
        )}
      >
        <span>Opps!! something went wrong</span>
      </div>
    );
  }
};

export default UIGoogleMap;
