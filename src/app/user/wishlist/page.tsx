"use client";

import { FC, useEffect, useRef } from "react";
import Container from "../components/container";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  selectWishlistIds,
  selectWishlistList,
  setWishlist,
} from "@/redux/slice/wishlist.slice";
import ProductCard from "@/components/productCard";
import axios from "axios";
import { ProductType } from "@/components/header/header";
import Link from "next/link";

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

  return (
    <Container containerTitle="WishList">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {wishlistProduct.length !== 0 ? (
          <>
            {wishlistProduct.map((product) => (
              <ProductCard product={product} />
            ))}
          </>
        ) : (
          <div className="col-span-full text-center text-lg font-normal">
            <span>
              Wishlist is currently empty. Explore and find your fashion at
            </span>{" "}
            <Link href="/" className="text-sanskrutiRed underline">
              Sanskruti
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default WishListPage;
