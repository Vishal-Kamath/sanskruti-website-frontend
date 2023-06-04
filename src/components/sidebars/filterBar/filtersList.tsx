import { selectFilterMain } from "@/redux/slice/filter.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC, useState, useEffect } from "react";
import FilterItem from "./filterItem";
import { FilterType, filters } from "@/data/filterlist";

const Size: FilterType = {
  main: "Size",
  sub: [
    { title: "XS" },
    { title: "S" },
    { title: "M" },
    { title: "L" },
    { title: "XL" },
  ],
};

const Color: FilterType = {
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
  const mainFilter = useAppSelector(selectFilterMain);
  const [main, setMain] = useState(filters[0]);

  useEffect(() => {
    setMain(filters.find((filter) => filter.main === mainFilter) || filters[0]);
  }, []);

  return (
    <div className="flex flex-col">
      <FilterItem
        main={mainFilter || main.main}
        sub={main.sub}
        classname="pl-[5vw] pr-2"
      />
      <FilterItem {...Size} classname="pl-[5vw] pr-2" />
      <FilterItem {...Color} classname="pl-[5vw] pr-2" />
    </div>
  );
};

export default FilterList;
