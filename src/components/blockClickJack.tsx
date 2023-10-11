"use client";

import { usePathname } from "next/navigation";
import { FC, useEffect } from "react";

const BlockClickJack: FC = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (window !== window.top && window.top) {
      window.top.location = window.location;
    }
  }, [pathname]);
  return null;
};

export default BlockClickJack;
