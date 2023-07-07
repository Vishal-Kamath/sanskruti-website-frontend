"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Order } from "../page";
import { useParams } from "next/navigation";
import axios from "axios";

const OrderDetailsPage: NextPage = () => {
  const [order, setOrder] = useState<Order>();
  const params = useParams();
  const orderId = params["orderId"];

  useEffect(() => {
    if (!orderId) return;
    axios
      .get<Order>(
        `${process.env.ENDPOINT}/api/v1/user/order/history/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setOrder(res.data);
      });
  }, [orderId]);

  return <div className="flex flex-col"></div>;
};

export default OrderDetailsPage;
