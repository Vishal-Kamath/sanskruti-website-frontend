"use client";

import { selectCategory } from "@/redux/slice/category.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC, Fragment } from "react";

const Description: FC<{ route: string[] }> = ({ route }) => {
  const { categories } = useAppSelector(selectCategory);

  const desc = categories.find(
    (category) => category.Title === route[1]
  )?.Meta_Description;

  return (
    <Fragment>
      <div className="text-lg font-semibold capitalize">
        {route.filter((item) => item !== "_").join(" / ")}
      </div>
      <div className="mb-5 text-gray-500">
        {desc ||
          "Discover your fashion at Sanskruti Nx, with products speacialy curated for your taste. Find traditional artistry with modern elegance. Explore ethnic wear, fusion styles, accessories. Quality craftsmanship, sustainable focus, and customer satisfaction drive our commitment."}
      </div>
    </Fragment>
  );
};

export default Description;
