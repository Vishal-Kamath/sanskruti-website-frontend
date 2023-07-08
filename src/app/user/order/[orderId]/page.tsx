"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Order } from "../page";
import { useParams } from "next/navigation";
import axios from "axios";
import Stepper from "./stepper";
import Image from "next/image";
import UIButton from "@/components/common/button";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";
import { dateFormater } from "@/utils/dateFormater";

const OrderDetailsPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<Order>();
  const params = useParams();
  const orderId = params["orderId"];

  const statuses = ["Pending", "Confirmed", "Out for deivery", "Delivered"];
  const currentStep = order
    ? statuses.indexOf(order.order.deliveryInfo.status)
    : 0;

  const returnStatuses = ["Pending", "Confirmed", "Out for return", "Returned"];
  const currentReturnStep =
    order && order.order.returnInfo
      ? statuses.indexOf(order.order.returnInfo.status)
      : 0;

  useEffect(() => {
    if (!orderId) return;
    dispatch(startLoading());
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
        dispatch(completeLoading());
        setOrder(res.data);
      })
      .catch(() => {
        dispatch(completeLoading());
      });
  }, [orderId]);

  // Calculations
  const variations: string[] = [];
  for (let key in order?.order.product.varient.variations) {
    variations.push(`${key}: ${order.order.product.varient.variations[key]}`);
  }

  const price =
    order &&
    (!!order.order.product.varient.discount
      ? order.order.product.varient.price *
        ((100 - order.order.product.varient.discount) / 100)
      : order.order.product.varient.price) * order.order.product.quantity;

  const isCancel = order?.order.deliveryInfo.status !== "Delivered";

  const requestedReturn = order?.order.returnInfo?.isReturned;

  // Cancel
  const handleCancelProduct = () => {
    const userWantsToCancel = confirm(
      "Are you sure you want to cancel your order?"
    );
  };

  // Return
  const handleReturnProduct = () => {
    const userWantsToReturn = confirm(
      "Are you sure you want to return your order?"
    );
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Address */}
      <div className="[&>*]:min-w-md flex w-full rounded-md border-[1px] border-gray-300 max-lg:flex-col [&>*]:w-full [&>*]:p-5">
        <div className="flex flex-col gap-3 border-gray-300 max-lg:border-b-[1px] lg:border-r-[1px]">
          <h3 className="text-[14px] font-semibold">Shipping Address</h3>
          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] font-semibold">
              {order?.payment.shippingAddress.fullName}
            </h3>
            <p className="text-gray-500">
              {order?.payment.shippingAddress.landmark}{" "}
              {order?.payment.shippingAddress.nearBy}{" "}
              {order?.payment.shippingAddress.city}{" "}
              {order?.payment.shippingAddress.state}{" "}
              {order?.payment.shippingAddress.pincode}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] font-semibold">Phone Number</h3>
            <p className="text-gray-500">
              +{order?.payment.shippingAddress.contactNo}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[14px] font-semibold">Billing Address</h3>
          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] font-semibold">
              {order?.payment.billingAddress.fullName}
            </h3>
            <p className="text-gray-500">
              {order?.payment.billingAddress.landmark}{" "}
              {order?.payment.billingAddress.nearBy}{" "}
              {order?.payment.billingAddress.city}{" "}
              {order?.payment.billingAddress.state}{" "}
              {order?.payment.billingAddress.pincode}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] font-semibold">Phone Number</h3>
            <p className="text-gray-500">
              +{order?.payment.billingAddress.contactNo}
            </p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="flex gap-6 rounded-md border-[1px] border-gray-300 p-5 max-xl:flex-col">
        <div className="flex w-full items-start gap-2">
          {order && (
            <Image
              src={order.order.product.images[0]}
              key={order.order.product.id + order.order.orderId}
              alt={order.order.product.name}
              width={50}
              height={50}
              className="h-[8rem] w-[10rem] overflow-hidden object-contain object-center"
            />
          )}
          <div className="flex w-full flex-col items-start justify-between gap-2">
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold">
                  {order && order.order.product.name.length > 30
                    ? `${order.order.product.name.slice(0, 30)}...`
                    : order?.order.product.name}
                </h3>
                <span className="text-xs font-bold text-gray-500">
                  {order?.order.product.brand_name}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {variations.map((val) => (
                  <span
                    key={val + order?.order._id}
                    className="rounded-full border-[1px] border-gray-400 bg-slate-50 px-2 py-1"
                  >
                    {val}
                  </span>
                ))}
                <span className="rounded-full border-[1px] border-gray-400 bg-slate-50 px-2 py-1">
                  quantity: {order?.order.product.quantity}
                </span>
              </div>
            </div>
            <div className="flex w-full gap-1 text-[14px] font-semibold">
              {!!order?.order.product.varient.discount ? (
                <div className="flex items-baseline gap-2">
                  <span>&#8377;{price}</span>
                  <s className="text-gray-500">
                    &#8377;
                    {order.order.product.varient.price *
                      order.order.product.quantity}
                  </s>
                  <span className="text-red-800">
                    ({order.order.product.varient.discount}% OFF)
                  </span>
                </div>
              ) : (
                <span>&#8377;{price}</span>
              )}
            </div>
          </div>
        </div>
        {!requestedReturn ? (
          <div className="flex w-full flex-col gap-5">
            <h3 className="text-[14px] font-semibold">Order Status</h3>
            <Stepper statuses={statuses} currentStep={currentStep} />
            {order?.order.deliveryInfo.status === "Delivered" && (
              <p className="ml-auto text-gray-500">
                on {dateFormater(new Date(order.order.deliveryInfo.date))}
              </p>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-5">
            <h3 className="text-[14px] font-semibold">Return Status</h3>
            <Stepper
              statuses={returnStatuses}
              currentStep={currentReturnStep}
            />
            {order.order.returnInfo &&
              order?.order.returnInfo.status === "Returned" && (
                <p className="ml-auto text-gray-500">
                  on {dateFormater(new Date(order.order.returnInfo.date))}
                </p>
              )}
          </div>
        )}
      </div>

      <div className="flex gap-5 max-lg:flex-col">
        <div className="flex w-full flex-col rounded-md border-[1px] border-gray-300 [&>*]:p-5">
          <h3 className="border-b-[1px] border-gray-300 font-semibold">
            Generate Invoice
          </h3>
          <div className="flex h-full flex-col gap-3">
            <p className="text-gray-500">
              Click the button below to generate your product invoice instantly.
              It&apos;s just one clicks away!
            </p>
            <UIButton className="mt-auto rounded-sm border-[1px]">
              Download
            </UIButton>
          </div>
        </div>

        <div className="flex w-full flex-col rounded-md border-[1px] border-red-300 text-sanskrutiRed [&>*]:p-5">
          <h3 className="border-b-[1px] border-red-300 font-semibold">
            Danger Zone ({isCancel ? "Cancel" : "Return"} Product)
          </h3>
          {isCancel ? (
            <div className="flex h-full flex-col gap-3">
              <p className="text-gray-500">
                Warning! the button below will cancel your ordered product.
                Please confirm your decision before taking any action.
              </p>
              <UIButton
                onClick={handleCancelProduct}
                className="mt-auto rounded-sm border-[1px] border-sanskrutiRed hover:outline-sanskrutiRedLight"
              >
                Cancel
              </UIButton>
            </div>
          ) : (
            <div className="flex h-full flex-col gap-3">
              <p className="text-gray-500">
                Caution! By clicking the button below, you are initiating a
                return request for the ordered product. Make sure you are
                certain before proceeding with this action.
              </p>
              <UIButton
                onClick={handleReturnProduct}
                className="mt-auto rounded-sm border-[1px] border-sanskrutiRed hover:outline-sanskrutiRedLight"
              >
                Return
              </UIButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
