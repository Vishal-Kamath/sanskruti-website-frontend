"use client";

import { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import { Order } from "../../[search]/page";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Stepper from "./stepper";
import Image from "next/image";
import UIButton from "@/components/common/button";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";
import { dateFormater } from "@/utils/dateFormater";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { cn } from "@/utils/lib";
import { BsArrowLeft, BsDot } from "react-icons/bs";
import UserReview from "./review";
import Link from "next/link";

const OrderDetailsPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [order, setOrder] = useState<Order>();
  const [allOrders, setAllOrders] = useState<Order["order"][]>([]);
  const params = useParams();
  const orderId = params["orderId"];

  const statuses: Order["order"]["deliveryInfo"]["status"][] = [
    "Pending",
    "Confirmed",
    "Out for delivery",
    "Delivered",
  ];
  const currentStep = order
    ? statuses.indexOf(order.order.deliveryInfo.status)
    : 0;

  const returnStatuses: Order["order"]["returnInfo"]["status"][] = [
    "Pending",
    "Confirmed",
    "Out for pickup",
    "Refund initiated",
    "Refund credited",
  ];
  const currentReturnStep =
    order && order.order.returnInfo.status
      ? returnStatuses.indexOf(order.order.returnInfo.status)
      : 0;

  useEffect(() => {
    if (!orderId) return;
    dispatch(startLoading());
    axios
      .get<{ order: Order; allOrders: Order["order"][] }>(
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
        setOrder(res.data.order);
        setAllOrders(res.data.allOrders);
      })
      .catch(() => {
        dispatch(completeLoading());
      });
  }, [orderId]);

  const price =
    order &&
    (!!order.order.product.varient.discount
      ? order.order.product.varient.price *
        ((100 - order.order.product.varient.discount) / 100)
      : order.order.product.varient.price) * order.order.product.quantity;

  const toCancel = order?.order.deliveryInfo.status !== "Delivered";
  const isCancelled = order?.order.cancellationInfo.isCancelled;
  const requestedReturn = order?.order.returnInfo?.isReturned;

  const requestCancel = () => {
    axios
      .get<NotificationType & { order: Order["order"] }>(
        `${process.env.ENDPOINT}/api/v1/user/order/requestCancel/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setOrder((order) => ({
          order: res.data.order,
          payment: order?.payment!,
        }));
        dispatch(setNotification(res.data));
        dispatch(showNotification());
      })
      .catch((err) => {
        dispatch(setNotification(err.response.data));
        dispatch(showNotification());
      });
  };

  // Cancel
  const handleCancelProduct = () => {
    const userWantsToCancel = confirm(
      `Are you sure you want to CANCEL your ${
        requestedReturn ? "return request" : "order"
      }? Warning this is an irreversible action.`
    );

    if (!userWantsToCancel) return;
    requestCancel();
  };

  // Return
  const handleReturnProduct = () => {
    const userWantsToReturn = confirm(
      "Are you sure you want to RETURN your order? Warning this is an irreversible action."
    );

    if (!userWantsToReturn) return;
    requestCancel();
  };

  const repay = () => {
    const body = {
      orderId: order?.order.orderId,
    };
    axios
      .post<{ link?: string; orderId: string } & NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/order/repay`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        if (response.link) return (window.location.href = response.link);

        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        router.replace(`/user/order/status?orderId=${response.orderId}`);
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
  };

  return (
    <div className="flex gap-5 max-md:flex-col">
      <div className="w-full md:max-w-sm">
        <div className="left-0 top-0 flex w-full flex-col gap-4 pt-40 md:sticky md:max-w-sm md:pt-28">
          <button
            onClick={() =>
              window.history.length < 2 || window.history
                ? router.push("/user/order/order")
                : router.back()
            }
            className="flex w-fit items-center gap-1 rounded-full border-none px-4 py-2 outline-none hover:bg-gray-100"
          >
            <BsArrowLeft className="h-5 w-auto" />
            Back
          </button>
          {/* Address */}
          <div className="[&>*]:min-w-md flex h-fit w-full flex-col rounded-md border-[1px] border-gray-300 md:max-w-sm [&>*]:w-full">
            <div className="flex flex-col gap-3 border-b-[1px] border-gray-300 px-3 pb-3 pt-6 lg:px-6 lg:pb-6 lg:pt-9">
              <h3 className="text-[14px] font-semibold">Shipping Address</h3>
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold">
                  {order?.payment.shippingAddress.name}
                </h3>
                <h4 className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                  <span>{order?.payment.shippingAddress.email}</span>
                  <BsDot className="h-4 w-4" />
                  <span>+{order?.payment.shippingAddress.tel}</span>
                </h4>
                <p className="text-gray-500">
                  {order?.payment.shippingAddress.address}{" "}
                  {order?.payment.shippingAddress.city}{" "}
                  {order?.payment.shippingAddress.state}{" "}
                  {order?.payment.shippingAddress.zip}{" "}
                  {order?.payment.shippingAddress.country}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-3 pb-6 pt-3 lg:px-6 lg:pb-9 lg:pt-6">
              <h3 className="text-[14px] font-semibold">Billing Address</h3>
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold">
                  {order?.payment.billingAddress.name}
                </h3>
                <h4 className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                  <span>{order?.payment.billingAddress.email}</span>
                  <BsDot className="h-4 w-4" />
                  <span>+{order?.payment.billingAddress.tel}</span>
                </h4>
                <p className="text-gray-500">
                  {order?.payment.billingAddress.address}{" "}
                  {order?.payment.billingAddress.city}{" "}
                  {order?.payment.billingAddress.state}{" "}
                  {order?.payment.billingAddress.zip}{" "}
                  {order?.payment.billingAddress.country}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 flex w-full flex-col rounded-md border-[1px] border-gray-300 [&>*]:p-3 [&>*]:lg:p-6">
            <h3 className="border-b-[1px] border-gray-300 font-semibold">
              Generate Invoice
            </h3>
            <div className="flex h-full flex-col gap-3">
              <p className="text-gray-500">
                Click the button below to generate your product invoice
                instantly. It&apos;s just one clicks away!
              </p>
              <UIButton className="mt-auto rounded-sm border-[1px]">
                Download
              </UIButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col gap-6 md:pt-28">
        <span className="ml-auto pt-3">
          OrderId: <u className="text-gray-700">{order?.order.orderId}</u>
        </span>
        {/* Order Details */}
        <div className="flex w-full flex-col gap-12 rounded-md border-[1px] border-gray-300 px-3 py-6 lg:px-6 lg:py-9">
          <div className="flex w-full items-start gap-6 max-sm:flex-col md:max-lg:flex-col">
            {order && (
              <Image
                src={order.order.product.images[0]}
                key={order.order.product.id + order.order.orderId}
                alt={order.order.product.name}
                width={200}
                height={200}
                className="w-full overflow-hidden object-contain object-center max-md:sm:w-1/3 lg:w-1/3"
              />
            )}
            <div className="flex w-full flex-col items-start justify-between gap-2">
              <div className="flex w-full flex-col gap-3">
                <div className="flex w-full items-start justify-between gap-3">
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
                  <div className="flex gap-1 text-[16px] font-semibold">
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

                <div className="flex flex-wrap gap-2 text-xs">
                  {order &&
                    Object.keys(order?.order.product.varient.variations)
                      .filter((val) => val)
                      .map(
                        (key) =>
                          `${key}: ${order.order.product.varient.variations[key]}`
                      )
                      .map((val) => (
                        <span
                          key={val + order?.order._id}
                          className="border-r-2 border-gray-400 pr-2 capitalize"
                        >
                          {val}
                        </span>
                      ))}
                  <span>Qty: {order?.order.product.quantity}</span>
                </div>
              </div>

              {!requestedReturn ? (
                <div className="mt-auto flex w-full flex-col gap-5 pt-6">
                  <h3 className="text-[14px] font-semibold">Order Status</h3>
                  <Stepper statuses={statuses} currentStep={currentStep} />
                  {order &&
                    (!isCancelled ? (
                      <p className="mx-auto text-gray-500">
                        {order.order.deliveryInfo.status} on{" "}
                        {dateFormater(new Date(order.order.deliveryInfo.date))}
                      </p>
                    ) : (
                      <p className="mx-auto text-red-500">
                        Order Cancelled on{" "}
                        {dateFormater(
                          new Date(order.order.cancellationInfo.date)
                        )}
                      </p>
                    ))}
                </div>
              ) : (
                <div className="mt-auto flex w-full flex-col gap-5 pt-6">
                  <h3 className="text-[14px] font-semibold">Return Status</h3>
                  <Stepper
                    statuses={returnStatuses}
                    currentStep={currentReturnStep}
                  />
                  {order.order.returnInfo && !isCancelled ? (
                    <p className="mx-auto text-gray-500">
                      {order.order.returnInfo.status} on{" "}
                      {dateFormater(new Date(order.order.returnInfo.date))}
                    </p>
                  ) : (
                    <p className="mx-auto text-red-500">
                      Return Cancelled on{" "}
                      {dateFormater(
                        new Date(order.order.cancellationInfo.date)
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-md border-[1px] border-gray-300 px-3 py-6 md:gap-6 lg:px-6 lg:py-9">
          <h4
            className={cn(
              "flex gap-2 text-[16px] font-semibold",
              order?.payment.paymentInfo.order_status !== "Success" &&
                "border-b-[1px] border-gray-300 pb-3 md:pb-6"
            )}
          >
            <span>Transaction Status:</span>
            {order &&
              (order.payment.paymentInfo.order_status === "Success" ? (
                <span className="text-green-600">Success</span>
              ) : order.payment.paymentInfo.order_status === "Failure" ? (
                <span className="text-red-600">Failed</span>
              ) : order.payment.paymentInfo.order_status === "Aborted" ? (
                <span className="text-yello-600">Aborted</span>
              ) : order.payment.paymentInfo.order_status === "Invalid" ? (
                <span className="text-amber-600">Invalid</span>
              ) : order.payment.paymentInfo.order_status === "Timeout" ? (
                <span className="text-blue-600">Timeout</span>
              ) : (
                <span className="text-gray-600">Pending</span>
              ))}
          </h4>

          <p className="-mb-4">
            Transaction method: {order?.payment.paymentMethod}
          </p>
          <p
            className={cn(
              "text-gray-500",
              (order?.payment.paymentInfo.order_status === "Success" ||
                !order?.payment.paymentInfo.order_status ||
                order.payment.paymentMethod === "COD") &&
                "hidden"
            )}
          >
            Your order could have failed, aborted, timed out, invalid. Feel free
            to try the payment process again for a smooth transaction. For more
            information feel free to{" "}
            <a
              href="mailto:info@sanskrutinx.com"
              className="text-blue-400 underline hover:text-blue-700"
            >
              contact
            </a>{" "}
            our support team
          </p>
          <p
            className={cn(
              "text-gray-500",
              (order?.payment.paymentInfo.order_status === "Success" ||
                !!order?.payment.paymentInfo.order_status ||
                order?.payment.paymentMethod === "COD") &&
                "hidden"
            )}
          >
            Your order transaction is still proccessing. Please check again
            after 20 minutes. For more information feel free to{" "}
            <a
              href="mailto:info@sanskrutinx.com"
              className="text-blue-400 underline hover:text-blue-700"
            >
              contact
            </a>{" "}
            our support team
          </p>
          <p
            className={cn(
              "text-gray-500",
              (order?.payment.paymentInfo.order_status !== "Success" ||
                !order?.payment.paymentInfo.order_status) &&
                order?.payment.paymentMethod !== "COD" &&
                "hidden"
            )}
          >
            Your transaction type is &apos;Cash on Delivery&apos;, so the
            transaction status is{" "}
            {order?.payment.paymentInfo.order_status || "Pending"} and will be
            successful upon delivery and receipt of payment.
          </p>

          <UIButton
            className={cn(
              "ml-auto w-fit rounded-full border-none bg-sanskrutiRed px-6 font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight",
              (order?.payment.paymentInfo.order_status === "Success" ||
                !order?.payment.paymentInfo.order_status ||
                order.payment.paymentMethod === "COD") &&
                "hidden"
            )}
            onClick={repay}
          >
            Checkout
          </UIButton>
        </div>

        {/* Order breack down */}
        <div className="flex flex-col gap-3 rounded-md border-[1px] border-gray-300 px-3 py-3 md:gap-6 lg:px-6 lg:py-6">
          <h4 className="col-span-full border-b-[1px] border-gray-300 pb-3 text-[16px] font-semibold md:pb-6">
            Order breakdown
          </h4>

          {allOrders.map((order, index) => (
            <Link
              href={`/user/order/details/${order._id}`}
              className="grid w-full cursor-pointer grid-cols-5 gap-3 border-b-[1px] border-gray-300 pb-3 md:gap-6 md:pb-6"
              key={order._id + index}
            >
              <div>
                {order && (
                  <Image
                    src={order.product.images[0]}
                    key={order.product.id + order.orderId}
                    alt={order.product.name}
                    width={100}
                    height={100}
                    className="w-full overflow-hidden object-contain object-center"
                  />
                )}
              </div>
              <div className="col-span-3 flex flex-col items-start gap-1">
                <div className="flex w-full flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[14px] font-semibold">
                      {order && order.product.name.length > 30
                        ? `${order.product.name.slice(0, 30)}...`
                        : order?.product.name}
                    </h3>
                    <span className="text-xs font-bold text-gray-500">
                      {order?.product.brand_name}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] md:text-xs">
                    {Object.keys(order?.product.varient.variations)
                      .filter((val) => val)
                      .map(
                        (key) =>
                          `${key}: ${order.product.varient.variations[key]}`
                      )
                      .map((val) => (
                        <span
                          key={val + order?._id}
                          className="border-r-2 border-gray-400 pr-2 capitalize last:border-none"
                        >
                          {val}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold">
                  &#8377;{order.product.varient.price}
                </span>
                <span className="text-xs text-gray-600">
                  Qty: {order?.product.quantity}
                </span>
              </div>
            </Link>
          ))}

          <div className="flex flex-col gap-2">
            <div className="mt-4 grid w-full grid-cols-5">
              <div className="col-span-3"></div>
              <div className="text-right">Sub Total:</div>
              <div className="text-right font-semibold text-black">
                &#8377;{order?.payment.orderInfo.SubTotal}
              </div>
            </div>
            <div className="grid w-full grid-cols-5">
              <div className="col-span-3"></div>
              <div className="text-right">Total GST:</div>
              <div className="text-right font-semibold">
                &#8377;{order?.payment.orderInfo.TotalGST}
              </div>
            </div>
            {!!order?.payment.orderInfo.Totaldiscount && (
              <div className="grid w-full grid-cols-5">
                <div className="col-span-3"></div>
                <div className="text-right">Discount:</div>
                <div className="text-right font-semibold text-green-700">
                  -&#8377;{order?.payment.orderInfo.Totaldiscount}
                </div>
              </div>
            )}
            {!!order?.payment.orderInfo.CouponDiscount && (
              <div className="grid w-full grid-cols-5">
                <div className="col-span-3"></div>
                <div className="text-right">Coupon Discount:</div>
                <div className="text-right font-semibold text-green-700">
                  -&#8377;{order?.payment.orderInfo.CouponDiscount}
                </div>
              </div>
            )}
            <div className="grid w-full grid-cols-5">
              <div className="col-span-3"></div>
              <div className="text-right">Total:</div>
              <div className="text-right font-semibold text-black">
                &#8377;{order?.payment.orderInfo.Amount}
              </div>
            </div>
          </div>
        </div>

        {/* Review */}
        <UserReview product_id={order?.order.product.id} />

        {/* Cancel */}
        <div
          className={cn(
            "flex w-full flex-col rounded-md border-[1px] border-red-300 text-sanskrutiRed [&>*]:p-5",
            isCancelled && "opacity-50 grayscale"
          )}
        >
          <h3 className="border-b-[1px] border-red-300 font-semibold">
            {toCancel || requestedReturn ? "Cancel" : "Return"}{" "}
            {requestedReturn ? "Request" : "Order"}
          </h3>
          {toCancel || requestedReturn ? (
            <div className="flex h-full flex-col gap-3">
              <p className="text-gray-500">
                Warning! the button below will cancel your{" "}
                {requestedReturn ? "return request" : "ordered product"}. Please
                confirm your decision before taking any action.
              </p>
              <UIButton
                onClick={() => !isCancelled && handleCancelProduct()}
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
                onClick={() => !isCancelled && handleReturnProduct()}
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
