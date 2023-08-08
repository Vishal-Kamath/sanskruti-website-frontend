"use client";

import ProductCard, { DummyProductCard } from "@/components/productCard";
import FilterBar from "@/components/sidebars/filterBar/filterBar";
import { FC, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { ProductType } from "@/components/header/header";
import Pagination from "@/components/common/pagination";

type ResultType = {
  totalPages: number;
  currentPage: number;
  products: ProductType[];
};
const CategoryPage: FC = () => {
  const params = useParams();
  const categoryName = decodeURIComponent(params["categoryName"]);
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ResultType>({
    totalPages: 1,
    currentPage: 1,
    products: [],
  });
  const products = result.products;

  const [desc, setDesc] = useState("");
  const [route, setRoute] = useState(["Home"]);

  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());

    const subCategory = searchParams.get(categoryName)!;
    console.log(subCategory);
    setRoute(
      !subCategory
        ? ["Home", categoryName]
        : ["Home", categoryName, subCategory]
    );

    current.delete(categoryName);
    const query = `?MainCategory=${categoryName}${
      !!current.toString() ? `&${current.toString()}` : ""
    }${
      !!searchParams.get(categoryName)
        ? `&SubCategory=${encodeURIComponent(subCategory)}`
        : ""
    }`;

    axios
      .get<ResultType>(
        `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setResult(res.data);
      });
  }, [categoryName, searchParams]);

  return (
    <div className="flex flex-col pb-5">
      <div className="mb-10 flex pt-36">
        <FilterBar setDesc={setDesc} />
        <div className="flex w-full flex-col gap-3 px-[3vw] pb-10 pt-5 text-justify sm:pl-4">
          {/* Descriptiom */}
          <div className="text-lg font-semibold capitalize">
            {route.join(" / ")}
          </div>
          <div className="text-gray-500">{desc}</div>

          <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
            {products.length ? (
              products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))
            ) : (
              <h3 className="col-span-full mt-6 text-center text-xl">
                NO PRODUCTS FOUND
              </h3>
            )}
          </div>

          <Pagination
            currentPage={result.currentPage}
            totalPages={result.totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
