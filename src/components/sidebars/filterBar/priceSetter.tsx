"use client";

import { setPrice } from "@/redux/slice/price.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { FC, useEffect, useState } from "react";

const PriceSetter: FC<{ min: number; max: number }> = ({ min, max }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPrice({ min, max }));
  }, [min, max]);

  return null;
};

export default PriceSetter;
