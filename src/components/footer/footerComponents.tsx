"use client";

import { category, selectCategory } from "@/redux/slice/category.slice";
import { useAppSelector } from "@/redux/store/hooks";
import Link from "next/link";
import { FC } from "react";

export const FooterCategory: FC = () => {
  const { categories } = useAppSelector(selectCategory);
  return (
    <div className="flex flex-col">
      <h5 className="flex items-center justify-between py-2 font-semibold">
        <span>CATEGORIES</span>
      </h5>
      <div className="flex flex-col gap-1 py-1">
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

export const FooterNewArrivals: FC = () => {
  const { categories } = useAppSelector(selectCategory);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">NEW ARRIVAL'S</h3>
      <div className="flex flex-wrap">
        {categories.map((category, index) => (
          <Link
            key={"New Arrival " + category.Title + index}
            href={`/category/${category.Title}?is_new_arrival=true`}
            className="my-1 mr-3 border-r-2 border-gray-300 pr-3 capitalize last:border-none"
          >
            Latest {category.Title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const FooterBestSellers: FC = () => {
  const { categories } = useAppSelector(selectCategory);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">BEST SELLER'S</h3>
      <div className="flex flex-wrap">
        {categories.map((category, index) => (
          <Link
            key={"Best Seller " + category.Title + index}
            href={`/category/${category.Title}?is_best_seller=true`}
            className="my-1 mr-3 border-r-2 border-gray-300 pr-3 capitalize last:border-none"
          >
            Best Selling {category.Title}
          </Link>
        ))}
      </div>
    </div>
  );
};
