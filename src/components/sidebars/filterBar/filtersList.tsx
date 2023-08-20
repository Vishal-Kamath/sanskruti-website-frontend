"use client";

import { FC, useEffect, useState } from "react";
import FilterItem from "./filterItem";
import { useParams } from "next/navigation";
import SortItem from "./sortItem";
import axios from "axios";
import VariantItem, { VariantType } from "./variantItem";
import { useAppSelector } from "@/redux/store/hooks";
import { CategoryType, selectCategory } from "@/redux/slice/category.slice";
import MainFilters from "./mainFilter";

const FilterList: FC<{ params: string[] }> = ({ params }) => {
  const { categories } = useAppSelector(selectCategory);
  const [main, setMain] = useState<CategoryType>();

  const [variants, setVariants] = useState<VariantType[]>([]);

  useEffect(() => {
    const cat = categories?.find(
      (category) =>
        category.Title.toLowerCase() ===
        decodeURIComponent(params[0].toLowerCase())
    );
    setMain(cat);
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

  const categoriesList = categories.map((category) => category.Title);

  return (
    <div className="flex flex-col pl-[3vw] pr-2">
      <MainFilters
        categoriesList={categoriesList}
        selected={main?.Title || ""}
      />
      {main && (
        <FilterItem
          categoriesList={categoriesList}
          main={main?.Title}
          sub={main?.subCategory}
          selected={params[1]}
        />
      )}
      <SortItem />
      {variants.map((variant, index) => (
        <VariantItem key={variant.varientName + index} {...variant} />
      ))}
    </div>
  );
};

export default FilterList;
