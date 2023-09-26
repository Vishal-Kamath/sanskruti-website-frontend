"use client";

import { FC, useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";

const Analytics: FC = () => {
  const [code, setCode] = useState("");

  const _get = () => {
    axios
      .get(`${process.env.ENDPOINT}/api/v1/user/analytics/google`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setCode(res.data.code || "");
      })
      .catch();
  };

  useEffect(() => {
    _get();
  }, []);

  return code ? (
    <>
      <Script
        async
        id="analytics-1"
        src={`https://www.googletagmanager.com/gtag/js?id=G-${code}`}
        strategy="afterInteractive"
      ></Script>
      <Script id="analytics-2">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-${code}');
        `}
      </Script>
    </>
  ) : null;
};

export default Analytics;
