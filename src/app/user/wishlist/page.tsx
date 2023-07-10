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
import { cn } from "@/utils/lib";

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
  const [subFilter, setSubFilter] = useState("No filter");
  const categories = useAppSelector(selectCategory);

  const categoryFilters = categories.categories.map(
    (category) => category.Title
  );
  categoryFilters.push("No filter");

  const subCategoryFilters = categories.categories
    .find((category) => category.Title === filter)
    ?.subCategory.slice();
  if (subCategoryFilters) subCategoryFilters?.push("No filter");

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
          (filter === "No filter" || product.MainCategory === filter) &&
          (!subCategoryFilters ||
            (subCategoryFilters &&
              (subFilter === product.SubCategory || subFilter === "No filter")))
      )) ||
    [];

  return (
    <Container containerTitle="WishList">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 max-md:flex-col">
          <div className="text-md flex h-9 w-full items-center gap-1 rounded-md border-2 border-gray-300 px-2 text-gray-400 focus-within:border-gray-600 focus-within:text-gray-600">
            <AiOutlineSearch className="aspect-sqaure text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full border-none bg-transparent outline-none"
              placeholder="Search for past orders"
            />
          </div>
          <div className="flex w-full gap-3 md:max-w-[20rem]">
            <div className="relative w-full text-gray-500 focus-within:text-gray-600">
              <select
                name="filter"
                id="filter"
                title="Filter by main category"
                defaultValue="No filter"
                onChange={(e) => setFilter(e.target.value)}
                className="h-9 w-full rounded-md border-2 border-gray-300 bg-transparent px-2 outline-none focus-within:border-gray-600"
              >
                {categoryFilters.map((val) => (
                  <option key={"filter " + val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <label
                className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1  text-xs"
                htmlFor="filter"
              >
                main category
              </label>
            </div>
            {subCategoryFilters && subCategoryFilters.length && (
              <div className="relative w-full text-gray-500 focus-within:text-gray-600">
                <select
                  name="sub filter"
                  id="sub filter"
                  title="Filter by sub category"
                  defaultValue="No filter"
                  onChange={(e) => setSubFilter(e.target.value)}
                  className="h-9 w-full rounded-md border-2 border-gray-300 bg-transparent px-2 outline-none focus-within:border-gray-600 md:w-[10rem]"
                >
                  {subCategoryFilters.map((val) => (
                    <option key={"filter " + val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <label
                  className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1  text-xs"
                  htmlFor="sub filter"
                >
                  sub category
                </label>
              </div>
            )}
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
