"use client";

import { selectLoadingState } from "@/redux/slice/loading.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import { FC } from "react";

const LoadingComponent: FC = () => {
  const loading = useAppSelector(selectLoadingState);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-full max-h-screen w-full flex-col items-center justify-evenly gap-7 bg-white",
        loading.loading ? "z-[999]" : "hidden"
      )}
    >
      <div className="mask relative isolate h-full min-h-screen w-full max-w-[15rem] overflow-hidden md:max-w-xs">
        <div
          style={{
            width: `${
              loading.loading
                ? loading.total
                  ? (loading.complete / loading.total) * 100
                  : 0
                : 100
            }%`,
          }}
          className="absolute left-0 top-0 -z-10 h-full w-full bg-sanskrutiRed"
        ></div>
        <div className="absolute left-0 top-0 -z-20 h-full w-full bg-slate-400"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
