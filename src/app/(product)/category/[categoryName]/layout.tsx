"use client";

import FilterBar from "@/components/sidebars/filterBar/filterBar";
import { selectCategory } from "@/redux/slice/category.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
const CategoryLayout: FC<Props> = ({ children }) => {
  const params = useParams();
  const categoryName = decodeURIComponent(params["categoryName"]);
  const searchParams = useSearchParams();

  const categories = useAppSelector(selectCategory);

  const desc = categories.categories.find(
    (category) => category.Title.toLowerCase() === categoryName.toLowerCase()
  )?.Meta_Description;
  const route = searchParams.get(categoryName)
    ? ["Home", categoryName, searchParams.get(categoryName)]
    : ["Home", categoryName];

  return (
    <div className="flex flex-col pb-5">
      <div className="mb-10 flex pt-36">
        <FilterBar />
        <div className="flex w-full flex-col gap-3 px-[3vw] pb-10 pt-5 text-justify sm:pl-4">
          {/* Descriptiom */}
          <div className="text-lg font-semibold capitalize">
            {route.join(" / ")}
          </div>
          <div className="text-gray-500">{desc}</div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
