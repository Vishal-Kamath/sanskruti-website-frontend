"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

type SortType = {
  name: string;
  query: string;
};

const SortCheckItem: FC<{ sortItem: SortType }> = ({ sortItem }) => {
  const [selected, setSelected] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (selected) deSelectVariant();
    else selectVariant();
  };

  const selectVariant = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.set(sortItem.query, "true");
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(true);
  };

  const deSelectVariant = () => {
    setSelected(false);

    const current = new URLSearchParams(searchParams.toString());
    current.delete(sortItem.query);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get(sortItem.query) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(true);
  }, [sortItem.name]);

  return (
    <span
      key={sortItem.name}
      className="flex items-center gap-4 font-light max-sm:text-[16px] sm:gap-3"
    >
      <div className="relative h-[14px] w-[14px]">
        <input
          type="radio"
          name="Sort"
          checked={selected}
          id={sortItem.name + " sort filter sidebar"}
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          onClick={() => onClick()}
          onChange={() => {}}
        />
        {selected ? (
          <BsFillCheckSquareFill className="h-full w-full fill-sky-400" />
        ) : (
          <div className="h-full w-full rounded-sm border-2 border-gray-300"></div>
        )}
      </div>
      <label
        className="cursor-pointer capitalize text-gray-700"
        htmlFor={sortItem.name + " sort filter sidebar"}
      >
        {sortItem.name}
      </label>
    </span>
  );
};

const SortItem: FC = () => {
  const sort = [
    {
      name: "Featured",
      query: "is_featured",
    },
    {
      name: "New arrival's",
      query: "is_new_arrival",
    },
    {
      name: "Best seller's",
      query: "is_best_seller",
    },
  ];

  return (
    <div className="flex flex-col py-2">
      <h5 className="flex items-center justify-between text-lg font-medium sm:text-[16px] sm:font-normal">
        Sort
      </h5>
      <div className="flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 pr-4 scrollbar-thin scrollbar-track-gray-400">
        {sort.map((sortItem, index) => (
          <SortCheckItem key={sortItem.name + index} sortItem={sortItem} />
        ))}
      </div>
    </div>
  );
};

export default SortItem;
