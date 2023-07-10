"use client";

import { selectLoadingState } from "@/redux/slice/loading.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import Image from "next/image";
import { FC } from "react";

const LoadingComponent: FC = () => {
  const loading = useAppSelector(selectLoadingState);
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex min-h-screen w-full flex-col items-center justify-evenly gap-7 bg-white",
        !loading.loading ? "hidden" : "z-[999]"
      )}
    >
      <div className="flex aspect-square items-center justify-center rounded-full bg-amber-50 p-[1rem] shadow-lg">
        <Image
          src="/assets/logo.png"
          alt="Sanskruti Logo"
          width={500}
          height={500}
          className="w-[13rem]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="h-2 w-[90vw] max-w-lg rounded-full bg-slate-400">
          <div
            style={{
              width: `${
                loading.total ? (loading.complete / loading.total) * 100 : 0
              }%`,
            }}
            className="h-full rounded-full bg-amber-400"
          ></div>
        </div>
        <span className="text-lg">
          {loading.complete} / {loading.total} items fetched...
        </span>
      </div>
    </div>
  );
};

export default LoadingComponent;
