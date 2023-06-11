"use client";

import { FC, useEffect, useState } from "react";
import FilterItem from "./filterItem";
import { filters } from "@/data/filterlist";
import { useParams } from "next/navigation";

const Size = {
  main: "Size",
  sub: [
    { title: "XS" },
    { title: "S" },
    { title: "M" },
    { title: "L" },
    { title: "XL" },
  ],
};

const Color = {
  main: "Color",
  sub: [
    { title: "Black" },
    { title: "White" },
    { title: "Blue" },
    { title: "Pink" },
    { title: "Purple" },
  ],
};

const FilterList: FC = () => {
  const params = useParams();
  const [main, setMain] = useState(filters[0]);

  useEffect(() => {
    setMain(
      filters.find(
        (filter) => filter.main === decodeURIComponent(params["categoryName"])
      ) || filters[0]
    );
  }, [params]);

  return (
    <div className="flex flex-col">
      <FilterItem main={main.main} sub={main.sub} classname="pl-[5vw] pr-2" />
      <FilterItem {...Size} classname="pl-[5vw] pr-2" />
      <FilterItem {...Color} classname="pl-[5vw] pr-2" />
    </div>
  );
};

export default FilterList;
