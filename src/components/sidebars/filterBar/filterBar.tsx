"use client";

import { selectSidebarOpen } from "@/redux/slice/sidebar.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import FilterList from "./filtersList";

const FilterBar: FC<{
  setDesc: Dispatch<SetStateAction<string>>;
}> = ({ setDesc }) => {
  const sideBarOpen = useAppSelector(selectSidebarOpen);
  return (
    <div
      className={`${
        !sideBarOpen && "max-sm:hidden"
      } isolate z-30 flex min-h-full w-full flex-col overflow-x-hidden overflow-y-scroll bg-white scrollbar-none max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:min-h-screen max-sm:pt-28 sm:max-w-[50vw] md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[18vw]`}
    >
      <h3 className="w-full pl-[3vw] pr-4 pt-6 text-[16px] font-semibold">
        FILTERS
      </h3>

      <FilterList setDesc={setDesc} />
    </div>
  );
};

export default FilterBar;
