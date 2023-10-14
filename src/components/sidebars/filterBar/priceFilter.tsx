"use client";

import { selectPrice } from "@/redux/slice/price.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { Box } from "@mui/material";
import Slider from "@mui/material/Slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

const minDistance = 10;

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

function valuetext(value: number) {
  return `${value}Rs`;
}

const PriceFilter: FC = () => {
  const { min, max } = useAppSelector(selectPrice);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const minParam = Number(searchParams.get("price.min"));
  const maxParam = Number(searchParams.get("price.max"));

  const setMin = () => {
    if (Number.isNaN(minParam) || !minParam) return min;
    if (minParam < min) return min;
    if (minParam > max) return min;
    if (minParam > maxParam) return min;
    return minParam;
  };

  const setMax = () => {
    if (Number.isNaN(maxParam) || !maxParam) return max;
    if (maxParam > max) return max;
    if (maxParam < min) return max;
    if (maxParam < minParam) return max;
    return maxParam;
  };

  const [value, setValue] = useState<number[]>([setMin(), setMax()]);

  const handleRedirect = useCallback(
    debounce((value: number[]) => {
      const current = new URLSearchParams(searchParams.toString());
      current.set("price.min", value[0].toString());
      current.set("price.max", value[1].toString());
      const query = current.toString() ? `?${current.toString()}` : "";
      router.push(`${pathname}/${query}`, { forceOptimisticNavigation: true });
    }, 750),
    []
  );

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
        handleRedirect([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
        handleRedirect([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
      handleRedirect(newValue as number[]);
    }
  };

  return (
    <div className="flex flex-col py-2">
      <h5 className="flex items-center justify-between text-lg font-medium capitalize sm:text-[16px] sm:font-normal">
        Price
      </h5>
      <Box className="px-3">
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          min={min}
          max={max}
          value={value}
          size="small"
          color="primary"
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
      <div className="flex flex-wrap justify-between text-xs font-medium text-gray-600">
        <span>₹{value[0]}</span>
        <span>₹{value[1]}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
