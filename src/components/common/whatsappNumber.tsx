"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";

const WhatsappNumber: FC<{ className?: string }> = ({ className }) => {
  const [number, setNumber] = useState("");

  useEffect(() => {
    const getWhatsApp = async () => {
      axios
        .get<{ number: number }>(
          `${process.env.ENDPOINT}/api/v1/superadmin/config/whatsappNumber`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setNumber(res.data.number?.toString() || "");
        })
        .catch();
    };
    getWhatsApp();
  }, []);
  const whatsappURL = `https://api.whatsapp.com/send?phone=${number}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      +91 {number}
    </a>
  );
};

export default WhatsappNumber;
