"use client";

import { cn } from "@/utils/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

const FilterItem: FC<{
  main: string;
  sub: { title: string }[];
  classname?: string;
}> = ({ main, sub, classname }) => {
  const [selected, setSelected] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = (value: string) => {
    if (selected === value) deSelectVariant();
    else selectVariant(value);
  };

  const selectVariant = (value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set(main, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };

  const deSelectVariant = () => {
    const radio = document.getElementById(
      selected + " filter sidebar"
    ) as HTMLInputElement;
    radio.checked = false;
    setSelected("");

    const current = new URLSearchParams(searchParams.toString());
    current.delete(main);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get(main) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(selectedTagFromQuery);
  }, [searchParams, main]);

  return (
    <div className="flex flex-col gap-2 border-t-2 border-gray-100 py-2 first:border-0">
      <h5
        className={cn(
          "flex items-center justify-between text-[16px] font-medium sm:text-sm sm:font-normal",
          classname
        )}
      >
        {main}
      </h5>
      <div
        className={cn(
          "flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400",
          classname
        )}
      >
        {sub.map((subItem) => (
          <span
            key={subItem.title}
            className="flex items-center gap-4 font-extralight sm:gap-3 sm:text-xs"
          >
            <div className="relative h-[14px] w-[14px]">
              <input
                type="radio"
                name={main}
                checked={selected === subItem.title}
                id={subItem.title + " filter sidebar"}
                className="absolute left-0 top-0 h-full w-full opacity-0"
                onClick={() => onClick(subItem.title)}
              />
              {selected === subItem.title ? (
                <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
              ) : (
                <div className="h-full w-full rounded-sm border-2 border-gray-300"></div>
              )}
            </div>
            {subItem.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
