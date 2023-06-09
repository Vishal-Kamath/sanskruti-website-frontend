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
      <Image
        src="/assets/logo.svg"
        alt="Sanskruti Logo"
        width={500}
        height={500}
        className="aspect-square h-[15rem] w-fit drop-shadow-lg"
      />
      <div className="h-2 w-[90vw] max-w-lg rounded-full bg-slate-400">
        <div
          style={{
            width: `${loading.value}%`,
          }}
          className="h-full rounded-full bg-amber-400"
        ></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
