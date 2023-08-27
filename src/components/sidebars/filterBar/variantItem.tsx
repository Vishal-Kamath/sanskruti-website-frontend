"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

export type VariantType = {
  varientName: string;
  value: string[];
};

const VariantItem: FC<VariantType & {}> = ({ varientName, value }) => {
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
    current.set("var." + varientName, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };

  const deSelectVariant = () => {
    setSelected("");

    const current = new URLSearchParams(searchParams.toString());
    current.delete("var." + varientName);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get("var." + varientName) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(selectedTagFromQuery);
  }, [searchParams, varientName]);

  return (
    <div className="flex flex-col py-2">
      <h5 className="flex items-center justify-between text-lg font-medium capitalize sm:text-[16px] sm:font-normal">
        {varientName}
      </h5>
      <div className="flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400">
        {value.map((valueItem) => (
          <span
            key={valueItem}
            className="flex items-center gap-4 font-light capitalize max-sm:text-[16px] sm:gap-3"
          >
            <div className="relative h-[14px] w-[14px]">
              <input
                type="radio"
                name={varientName}
                checked={selected === valueItem}
                id={valueItem + " variant filter sidebar"}
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onClick={() => onClick(valueItem)}
                onChange={() => {}}
              />
              {selected === valueItem ? (
                <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
              ) : (
                <div className="h-full w-full rounded-sm border-2 border-gray-300"></div>
              )}
            </div>
            <label
              className="cursor-pointer capitalize text-gray-700"
              htmlFor={valueItem + " variant filter sidebar"}
            >
              {valueItem}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default VariantItem;
