"use client";

import { FC, useEffect, useState } from "react";
import FilterItem from "./filterItem";
import { filters } from "@/data/filterlist";
import { useParams } from "next/navigation";
import SortItem from "./sortItem";
import axios from "axios";
import VariantItem, { VariantType } from "./variantItem";

const FilterList: FC = () => {
  const params = useParams();
  const [main, setMain] = useState(filters[0]);

  const [variants, setVariants] = useState<VariantType[]>([]);

  useEffect(() => {
    setMain(
      filters.find(
        (filter) => filter.main === decodeURIComponent(params["categoryName"])
      ) || filters[0]
    );
  }, [params]);

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
      <FilterItem main={main.main} sub={main.sub} classname="pl-[3vw] pr-2" />
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
