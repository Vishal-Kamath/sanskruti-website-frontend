"use client";

import { FC, useEffect, useRef } from "react";
import Container from "../components/container";
import UIButton from "@/components/common/button";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  selectWishlistIds,
  selectWishlistList,
  setWishlist,
  setWishlistIds,
} from "@/redux/slice/wishlist.slice";
import ProductCard from "@/components/productCard";
import axios from "axios";
import { ProductType } from "@/components/header/header";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";

const WishListPage: FC = () => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const wishlistProduct = useAppSelector(selectWishlistList);

  const cacheIds = useRef(JSON.stringify(wishlistIds));

  useEffect(() => {
    if (cacheIds.current === JSON.stringify(wishlistIds)) return;
    axios
      .get<{ ids: string[]; list: ProductType[] }>(
        `${process.env.ENDPOINT}/api/v1/user/wishlist`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setWishlist({ ids: res.data.ids, list: res.data.list }));
        cacheIds.current = JSON.stringify(res.data.ids);
      })
      .catch(() => {});
  }, [wishlistIds, cacheIds]);

  const addToCart = async (productId: string, variant: string[]) => {
    const cartResponse = await axios.post<NotificationType>(
      `${process.env.ENDPOINT}/api/v1/user/cart`,
      {
        productId,
        quantity: 1,
        variant,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (cartResponse.status !== 200) return;

    await axios
      .delete<{ ids: string[] }>(
        `${process.env.ENDPOINT}/api/v1/user/wishlist?productId=${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setWishlistIds({ ids: res.data.ids }));
      })
      .catch(() => {});

    dispatch(
      setNotification({
        message: cartResponse.data.message,
        type: cartResponse.data.type,
      })
    );
    dispatch(showNotification());
  };

  return (
    <Container containerTitle="WishList">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {wishlistProduct.length !== 0 ? (
          <>
            {wishlistProduct.map((product) => (
              <div key={product._id} className="flex flex-col gap-2">
                <ProductCard product={product} />
                <UIButton
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.varients.variations[0].combinationString
                    )
                  }
                  className="rounded-sm border-[1px]"
                >
                  Add to cart
                </UIButton>
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-full text-lg font-semibold">
            No Products in wishlist...
          </div>
        )}
      </div>
    </Container>
  );
};

export default WishListPage;
