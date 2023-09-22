"use client";

import { Address } from "@/redux/slice/user.slice";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import OrderComponet from "../../components/orderComponent";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/utils/lib";

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
      status: "Pending" | "Confirmed" | "Out for delivery" | "Delivered";
    };
    cancellationInfo: {
      isCancelled: boolean;
      date: string;
      Amount_refunded: boolean;
    };
    returnInfo: {
      isReturned: boolean;
      date: string;
      status:
        | "Pending"
        | "Confirmed"
        | "Out for pickup"
        | "Refund initiated"
        | "Refund credited";
      Amount_refunded: boolean;
    };
  };
  payment: {
    paymentMethod: "COD" | "PayZapp";
    orderId: string;
    userId: string;
    shippingAddress: Address;
    billingAddress: Address;
    orderInfo: {
      Date: Date;
      SubTotal: number;
      ShippingCost: number;
      CouponCode?: string;
      CouponDiscount?: number;
      Totaldiscount: number;
      TotalGST: number;
      Amount: number;
    };
    paymentInfo: {
      order_status?: "Success" | "Failure" | "Aborted" | "Invalid" | "Timeout";
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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("No filter");

  const param = useParams();
  const searchParam = param["search"];
  const pathname = usePathname();

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
        try {
          const sortByDate = res.data.orders
            .filter((item) => item.payment.orderInfo.Date)
            .sort((order1, order2) => {
              const orderDate1 = new Date(
                order1.payment.orderInfo.Date
              ).getTime();
              const orderDate2 = new Date(
                order2.payment.orderInfo.Date
              ).getTime();
              return orderDate2 - orderDate1;
            });

          setOrders(sortByDate);
          dispatch(completeLoading());
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        dispatch(completeLoading());
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const orderList = orders?.length
    ? orders
        .filter((order) => {
          console.log(
            (!order.order.cancellationInfo.isCancelled &&
              !order.order.returnInfo.isReturned) ||
              (order.order.cancellationInfo.isCancelled &&
                order.order.returnInfo.isReturned)
          );
          if (searchParam === "order") {
            return (
              (!order.order.cancellationInfo.isCancelled &&
                !order.order.returnInfo.isReturned) ||
              (order.order.cancellationInfo.isCancelled &&
                order.order.returnInfo.isReturned)
            );
          }
          if (searchParam === "cancelled") {
            return (
              order.order.cancellationInfo.isCancelled &&
              !order.order.returnInfo.isReturned
            );
          }
          if (searchParam === "returned") {
            return (
              !order.order.cancellationInfo.isCancelled &&
              order.order.returnInfo.isReturned
            );
          }
          return false;
        })
        .filter(
          (order) =>
            (order.order.product.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) &&
              filter === "No filter") ||
            order.order.deliveryInfo.status === filter
        )
    : [];

  return (
    <Container containerTitle="Order History">
      <div className="flex flex-col gap-4 pt-1">
        <div className="flex gap-2 max-md:flex-col">
          <div className="text-md flex h-9 w-full items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 text-gray-400 focus-within:border-gray-600 focus-within:text-gray-600">
            <AiOutlineSearch className="aspect-sqaure text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full border-none bg-transparent outline-none"
              placeholder="Search for past orders"
            />
          </div>
          <div className="flex h-full gap-2 max-md:w-full">
            <select
              name="filter"
              id="filter"
              title="Filter by status"
              defaultValue="No filter"
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 w-full rounded-md border-[1px] border-gray-300 bg-transparent px-2 outline-none focus-within:border-gray-600 md:w-[10rem]"
            >
              {[
                "Pending",
                "Confirmed",
                "Out for deivery",
                "Delivered",
                "No filter",
              ].map((val) => (
                <option key={"filter " + val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <button
              title="Refresh"
              onClick={getOrders}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border-[1px] border-gray-300 outline-none"
            >
              <HiOutlineRefresh className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex w-full gap-3 max-md:flex-col">
          <div className="flex h-full flex-col gap-2">
            {[
              {
                link: "/user/order/order",
                title: "Orders",
              },
              {
                link: "/user/order/cancelled",
                title: "Cancelled",
              },
              {
                link: "/user/order/returned",
                title: "Returned",
              },
            ].map((item, index) => (
              <Link
                key={item.link + index}
                href={item.link}
                className={cn(
                  "w-full rounded-md border-[1px] border-gray-300 p-2 text-gray-500 hover:border-sky-300 hover:bg-sky-50 md:w-[15rem]",
                  pathname === item.link && "border-gray-400 bg-gray-50"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex w-full flex-col gap-2">
            {orderList.length ? (
              orderList.map((order, index) => (
                <OrderComponet
                  key={
                    "order list element" +
                    order.payment.orderId +
                    order.order._id +
                    index
                  }
                  order={order}
                />
              ))
            ) : (
              <div className="mt-5 text-center text-lg font-semibold">
                No orders Found
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderHistoryPage;
