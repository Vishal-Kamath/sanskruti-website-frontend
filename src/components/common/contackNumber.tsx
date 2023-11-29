"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";

const ContactNumber: FC<{ className?: string }> = ({ className }) => {
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
  const whatsappURL = `tel:91${number}`;

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

export default ContactNumber;
