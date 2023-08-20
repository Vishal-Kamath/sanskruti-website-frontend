"use client";

import { selectSidebarOpen } from "@/redux/slice/sidebar.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import FilterList from "./filtersList";
import Image from "next/image";

const FilterBar: FC<{ params: string[] }> = ({ params }) => {
  const sideBarOpen = useAppSelector(selectSidebarOpen);
  return (
    <div
      className={`${
        !sideBarOpen && "max-sm:hidden"
      } isolate z-30 flex min-h-full w-full flex-col overflow-x-hidden overflow-y-scroll bg-white pb-10 scrollbar-none max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:max-h-screen max-sm:min-h-screen max-sm:pt-36 sm:max-w-[30vw] md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[18vw]`}
    >
      <h3 className="w-full pl-[3vw] pr-4 pt-5 text-xl font-semibold sm:text-[16px]">
        FILTERS
      </h3>

      <FilterList params={params} />

      <div className="flex flex-col gap-6 pt-7 max-sm:hidden">
        <Image
          src="/assets/sidebar2.png"
          alt="sidebar image 1"
          width={300}
          height={300}
          className="w-full pl-[3vw] pr-4"
        />
        <Image
          src="/assets/sidebar1.png"
          alt="sidebar image 1"
          width={300}
          height={300}
          className="w-full pl-[3vw] pr-4"
        />
      </div>
    </div>
  );
};

export default FilterBar;
