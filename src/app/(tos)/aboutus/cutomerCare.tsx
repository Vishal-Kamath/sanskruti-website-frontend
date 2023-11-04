"use client";
import axios from "axios";
import { FC, useEffect, useState } from "react";

const CustomerCare: FC = () => {
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

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-500">
      <p>Whatsapp: +91 {number}</p>
      <p>Email: info@sanskrutinx.com</p>

      <p className="mt-4 max-w-lg">
        Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, Opposite Suchak
        Petrol Pump, Kalyan(West), Maharashtra 421301
      </p>
    </div>
  );
};

export default CustomerCare;
