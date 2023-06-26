"use client";

import { cn } from "@/utils/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

export type VariantType = {
  varientName: string;
  value: string[];
};

const VariantItem: FC<
  VariantType & {
    className?: string;
  }
> = ({ varientName, value, className }) => {
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
    current.set(varientName, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };

  const deSelectVariant = () => {
    setSelected("");

    const current = new URLSearchParams(searchParams.toString());
    current.delete(varientName);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get(varientName) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(selectedTagFromQuery);
  }, [searchParams, varientName]);

  return (
    <div className="flex flex-col gap-2 border-t-2 border-gray-100 py-2 first:border-0">
      <h5
        className={cn(
          "flex items-center justify-between text-[16px] font-medium capitalize sm:text-sm sm:font-normal",
          className
        )}
      >
        {varientName}
      </h5>
      <div
        className={cn(
          "flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400",
          className
        )}
      >
        {value.map((valueItem) => (
          <span
            key={valueItem}
            className="flex items-center gap-4 font-extralight capitalize sm:gap-3 sm:text-xs"
          >
            <div className="relative h-[14px] w-[14px]">
              <input
                type="radio"
                name={varientName}
                checked={selected === valueItem}
                id={valueItem + " filter sidebar"}
                className="absolute left-0 top-0 h-full w-full opacity-0"
                onClick={() => onClick(valueItem)}
                onChange={() => {}}
              />
              {selected === valueItem ? (
                <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
              ) : (
                <div className="h-full w-full rounded-sm border-2 border-gray-300"></div>
              )}
            </div>
            {valueItem}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VariantItem;
