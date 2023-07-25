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
      <div className="relative isolate h-fit w-fit">
        <Image
          src="/assets/sanskrutiLoadingCutout.png"
          alt="Sanskruti Logo"
          width={500}
          height={500}
          className="h-full max-h-[15rem] w-full object-contain object-center"
        />
        <div
          style={{
            width: `${
              loading.total ? (loading.complete / loading.total) * 100 : 0
            }%`,
          }}
          className="absolute left-0 top-0 -z-10 h-full bg-sanskrutiRed"
        ></div>
        <div className="absolute left-0 top-0 -z-20 h-full w-full bg-slate-400"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
