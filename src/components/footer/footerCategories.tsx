"use client";

import { selectCategory } from "@/redux/slice/category.slice";
import { useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { FC } from "react";

const FooterCategory: FC = () => {
  const { categories } = useAppSelector(selectCategory);
  return (
    <div className="flex flex-col">
      <h5 className="flex items-center justify-between py-2 font-bold">
        <span>CATEGORIES</span>
      </h5>
      <div className="text-500 flex flex-col gap-1 py-1">
        {categories.map((category) => (
          <Link
            href={`/category/${category.Title}`}
            key={category.Title}
            className="capitalize leading-none"
          >
            {category.Title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterCategory;
