"use client";

import { usePathname } from "next/navigation";
import { FC, useEffect } from "react";

const Redirect: FC = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.href.includes("sanskrutinx.in")) {
      window.location.href = window.location.href.replace(
        "sanskrutinx.in",
        "sanskrutinx.com"
      );
    }
  }, [pathname]);
  return null;
};

export default Redirect;
