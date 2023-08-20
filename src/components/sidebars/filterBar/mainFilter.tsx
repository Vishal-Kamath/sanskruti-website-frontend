"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

const MainFilters: FC<{
  categoriesList: string[];
  selected: string;
}> = ({ categoriesList, selected }) => {
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
    pathnameArray[2] = value;
    pathnameArray[3] = "_";
    const newPath = pathnameArray.join("/");
    router.push(`${newPath}/${query}`);
  };

  const deSelectVariant = () => {
    const current = new URLSearchParams(searchParams.toString());
    const query = !!current.toString() ? `?${current.toString()}` : "";
    pathnameArray[2] = "_";
    pathnameArray[3] = "_";
    const newPath = pathnameArray.join("/");
    router.push(`${newPath}/${query}`);
  };

  return (
    <div className="flex flex-col gap-2 border-b-[1px] border-slate-300 py-2">
      <h5 className="flex items-center justify-between text-lg font-medium capitalize sm:text-[16px] sm:font-normal">
        Categories
      </h5>
      <div className="flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400">
        {categoriesList.map((category) => (
          <span
            key={category}
            className="flex items-center gap-4 font-extralight max-sm:text-[16px] sm:gap-3"
          >
            <div className="relative h-[14px] w-[14px]">
              <input
                type="radio"
                name={"categories"}
                checked={selected === category}
                id={category + " filter sidebar"}
                className="absolute left-0 top-0 h-full w-full opacity-0"
                onClick={() => onClick(category)}
                onChange={() => {}}
              />
              {selected === category ? (
                <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
              ) : (
                <div className="h-full w-full rounded-sm border-2 border-gray-300 capitalize"></div>
              )}
            </div>
            <label
              htmlFor={category + " filter sidebar"}
              className="capitalize"
            >
              {category}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MainFilters;
