"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";

export const AnalyticsHead: FC = () => {
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
    <script
      id="gtm-script"
      dangerouslySetInnerHTML={{
        __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', 'GTM-${code}');
            `,
      }}
    />
  ) : null;
};

export const AnalyticsBody: FC = () => {
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
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=GTM-${code}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  ) : null;
};
