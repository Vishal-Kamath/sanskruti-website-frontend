"use client";

import { Address } from "@/redux/slice/user.slice";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../components/container";
import OrderComponet from "../components/orderComponent";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";

export type Order = {
  order: {
    _id: string;
    orderId: string;
    userId: string;
    product: {
      id: string;
      slug: string;
      name: string;
      brand_name: string;
      images: string[];
      gst_percent: number;
      quantity: number;
      varient: {
        price: number;
        discount?: number;
        variations: Record<string, string>;
      };
    };
    deliveryInfo: {
      date: string;
      status: "Pending" | "Delivered";
    };
    cancellationInfo: {
      isCancelled: boolean;
      Amount_refunded: boolean;
    };
    returnInfo?: {
      isReturned: boolean;
      status: string;
      Amount_refunded: boolean;
    };
  };
  payment: {
    paymentMethod: string;
    orderId: string;
    userId: string;
    shippingAddress: Address;
    billingAddress: Address;
    orderInfo: {
      Date: Date;
      status: string;
      SubTotal: number;
      ShippingCost: number;
      Totaldiscount: number;
      TotalGST: number;
      Amount: number;
    };
    paymentInfo: {
      status?: string;
      transactionId?: string;
      amount?: number;
      currency?: string;
      timestamp?: string;
      referenceId?: string;
    };
  };
};

const OrderHistoryPage: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>();
  const dispatch = useAppDispatch();

  const getOrders = () => {
    dispatch(startLoading());
    axios
      .get<{ orders: Order[] }>(
        `${process.env.ENDPOINT}/api/v1/user/order/history`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setOrders(res.data.orders);
        dispatch(completeLoading());
      })
      .catch((err) => {
        dispatch(completeLoading());
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container containerTitle="Order History">
      <div className="flex flex-col gap-2 pt-5">
        {orders &&
          orders.map((order) => (
            <OrderComponet key={order.payment.orderId} order={order} />
          ))}
      </div>
    </Container>
  );
};

export default OrderHistoryPage;
