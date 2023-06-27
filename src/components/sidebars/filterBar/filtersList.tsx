"use client";

import { FC, useEffect, useState } from "react";
import FilterItem from "./filterItem";
import { filters } from "@/data/filterlist";
import { useParams } from "next/navigation";
import SortItem from "./sortItem";
import axios from "axios";
import VariantItem, { VariantType } from "./variantItem";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCategory } from "@/redux/slice/category.slice";

const FilterList: FC = () => {
  const params = useParams();

  const { categories } = useAppSelector(selectCategory);

  const [main, setMain] = useState(categories[0]);

  const [variants, setVariants] = useState<VariantType[]>([]);

  useEffect(() => {
    setMain(
      categories?.find(
        (category) =>
          category.Title === decodeURIComponent(params["categoryName"])
      ) || categories[0]
    );
  }, [params, categories]);

  useEffect(() => {
    axios
      .get<{ varients: VariantType[] }>(
        `${process.env.ENDPOINT}/api/v1/user/getVarients`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setVariants(res.data.varients);
      });
  }, []);

  return (
    <div className="flex flex-col">
      {!!main && (
        <FilterItem
          main={main.Title}
          sub={main.subCategory}
          classname="pl-[3vw] pr-2"
        />
      )}
      <SortItem className="pl-[3vw] pr-2" />
      {variants.map((variant, index) => (
        <VariantItem
          key={variant.varientName + index}
          {...variant}
          className="pl-[3vw] pr-2"
        />
      ))}
    </div>
  );
};

export default FilterList;
