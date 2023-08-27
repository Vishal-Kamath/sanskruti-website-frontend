"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

const FilterItem: FC<{
  categoriesList: string[];
  main: string;
  sub: string[];
  selected: string;
}> = ({ main, sub, selected }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const searchParams = useSearchParams();

  const onClick = (value: string) => {
    if (selected === value) deSelectVariant();
    else selectVariant(value);
  };

  const selectVariant = (value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    const query = current.toString() ? `?${current.toString()}` : "";
    pathnameArray[3] = value;
    const newPath = pathnameArray.join("/");
    router.push(`${newPath}/${query}`);
  };

  const deSelectVariant = () => {
    const current = new URLSearchParams(searchParams.toString());
    const query = !!current.toString() ? `?${current.toString()}` : "";
    pathnameArray[3] = "_";
    const newPath = pathnameArray.join("/");
    router.push(`${newPath}/${query}`);
  };

  return (
    <div className="flex flex-col py-2">
      <h5 className="flex items-center justify-between text-lg font-medium capitalize sm:text-[16px] sm:font-normal">
        {main}
      </h5>
      <div className="flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400">
        {sub.map((subItem) => (
          <span
            key={subItem}
            className="flex items-center gap-4 font-light max-sm:text-[16px] sm:gap-3"
          >
            <div className="relative h-[14px] w-[14px]">
              <input
                type="radio"
                name={main}
                checked={selected === subItem}
                id={subItem + " filter sidebar"}
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onClick={() => onClick(subItem)}
                onChange={() => {}}
              />
              {selected === subItem ? (
                <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
              ) : (
                <div className="h-full w-full rounded-sm border-2 border-gray-300 capitalize"></div>
              )}
            </div>
            <label
              htmlFor={subItem + " filter sidebar"}
              className="cursor-pointer capitalize text-gray-700"
            >
              {subItem}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
