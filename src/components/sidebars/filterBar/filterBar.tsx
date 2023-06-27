"use client";

import { selectSidebarOpen } from "@/redux/slice/sidebar.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import FilterList from "./filtersList";

const FilterBar: FC = () => {
  const sideBarOpen = useAppSelector(selectSidebarOpen);
  return (
    <div
      className={`${
        !sideBarOpen && "max-sm:hidden"
      } isolate z-30 flex min-h-full w-full flex-col overflow-x-hidden overflow-y-scroll border-gray-300 bg-white scrollbar-none max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:min-h-screen max-sm:pt-28 sm:max-w-[50vw] sm:border-r-2 md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[18vw]`}
    >
      <h3 className="w-full border-b-2 border-gray-300 py-4 pl-[3vw] pr-4 text-[16px] font-normal">
        FILTERS
      </h3>

      <FilterList />
    </div>
  );
};

export default FilterBar;
