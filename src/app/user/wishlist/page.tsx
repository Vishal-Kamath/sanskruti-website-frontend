"use client";

import { FC, useEffect } from "react";
import Container from "../components/container";
import UIButton from "@/components/common/button";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  selectWishlistIds,
  selectWishlistList,
  setWishlist,
} from "@/redux/slice/wishlist.slice";
import ProductCard from "@/components/productCard";
import axios from "axios";
import { ProductType } from "@/components/header/header";

const WishListPage: FC = () => {
  const disptach = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const wishlistProduct = useAppSelector(selectWishlistList);

  useEffect(() => {
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
        disptach(setWishlist({ ids: res.data.ids, list: res.data.list }));
      })
      .catch(() => {});
  }, [wishlistIds]);

  return (
    <Container containerTitle="WishList">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistProduct.length !== 0 ? (
          <>
            {wishlistProduct.map((product) => (
              <div key={product._id} className="flex flex-col gap-2">
                <ProductCard product={product} />
                <UIButton className="rounded-sm border-[1px]">
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
