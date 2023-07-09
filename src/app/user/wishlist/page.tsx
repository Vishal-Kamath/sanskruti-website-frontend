"use client";

import { FC, useEffect, useRef, useState } from "react";
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
import { AiOutlineSearch } from "react-icons/ai";
import { selectCategory } from "@/redux/slice/category.slice";

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

  // search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("No filter");
  const categories = useAppSelector(selectCategory);

  const categoryFilters = categories.categories.map(
    (category) => category.Title
  );
  categoryFilters.push("No filter");

  const wishlist =
    (wishlistProduct &&
      wishlistProduct.filter(
        (product) =>
          (product.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
            product.MainCategory.toLocaleLowerCase().includes(
              search.toLocaleLowerCase()
            ) ||
            product.SubCategory.toLocaleLowerCase().includes(
              search.toLocaleLowerCase()
            ) ||
            product.brand_name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())) &&
          (filter === "No filter" || product.MainCategory === filter)
      )) ||
    [];

  return (
    <Container containerTitle="WishList">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="text-md flex h-9 w-full items-center gap-1 rounded-md border-2 border-gray-300 bg-slate-50 px-2 text-gray-400 focus-within:border-gray-600 focus-within:text-gray-600">
            <AiOutlineSearch className="aspect-sqaure text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full border-none bg-transparent outline-none"
              placeholder="Search for past orders"
            />
          </div>
          <div className="flex w-[10rem] items-center justify-center rounded-md border-2 border-gray-300 bg-slate-50">
            <select
              name="category filter"
              id="category filter"
              defaultValue="No filter"
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent outline-none"
            >
              {categoryFilters.map((val) => (
                <option key={"filter " + val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {wishlist.length !== 0 ? (
            <>
              {wishlist.map((product, index) => (
                <ProductCard
                  key={product.name + index + "wishlist"}
                  product={product}
                />
              ))}
            </>
          ) : !wishlistProduct.length ? (
            <div className="col-span-full mt-5 text-center text-lg font-normal">
              <span>
                Wishlist is currently empty. Explore and find your fashion at
              </span>{" "}
              <Link href="/" className="text-sanskrutiRed underline">
                Sanskruti
              </Link>
            </div>
          ) : (
            <div className="col-span-full mt-5 text-center text-lg font-normal">
              <span>No products found</span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default WishListPage;
