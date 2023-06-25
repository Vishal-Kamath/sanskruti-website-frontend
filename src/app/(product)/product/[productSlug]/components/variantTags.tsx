"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UIButton from "@/components/common/button";
import { cn } from "@/utils/lib";
import { ProductType } from "@/components/header/header";

const VariantTags: FC<{
  variant: ProductType["varients"]["attributes"][0];
  variantSetters: (value: string) => void;
}> = ({ variant, variantSetters }) => {
  const [selected, setSelected] = useState(variant.childern[0].value);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    variantSetters(selected);
  }, [selected]);

  const onClick = (value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set(variant.name, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get(variant.name) || ""
    );

    const existsInList = variant.childern.find(
      (child) => child.value === selectedTagFromQuery
    );

    if (!existsInList) {
      setSelected(variant.childern[0].value);
      variantSetters(variant.childern[0].value);
    } else {
      setSelected(selectedTagFromQuery);
      variantSetters(selectedTagFromQuery);
    }
  }, [searchParams, variant.name, variant.childern]);

  const filterChildren = variant.childern.filter((child) => child.state);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t-2 border-gray-300 py-3 capitalize",
        filterChildren.length === 0 && "hidden"
      )}
    >
      <h5 className="flex items-center text-lg font-bold">
        <span>{variant.name}</span>
      </h5>
      <div className="custom_scrollbar flex max-h-[10rem] flex-wrap gap-3 overflow-y-auto overflow-x-hidden py-1">
        {filterChildren.map((subVariant) => (
          <UIButton
            key={subVariant.value}
            className={cn(
              "relative isolate min-w-[3rem] rounded-full border-gray-700 px-3 py-2 text-[14px] capitalize",
              selected === subVariant.value && "bg-gray-700 text-white"
            )}
          >
            <input
              type="radio"
              name={variant.name}
              checked={selected === subVariant.value}
              id={variant.name + " " + subVariant.value}
              className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
              onClick={() => onClick(subVariant.value)}
              onChange={() => {}}
            />
            {subVariant.value}
          </UIButton>
        ))}
      </div>
    </div>
  );
};

export default VariantTags;
