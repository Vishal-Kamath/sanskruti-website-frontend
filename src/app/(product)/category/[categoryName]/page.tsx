"use client";

import ProductCard, { DummyProductCard } from "@/components/productCard";
import FilterBar from "@/components/sidebars/filterBar/filterBar";
import { FC, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { ProductType } from "@/components/header/header";

const CategoryPage: FC = () => {
  const params = useParams();
  const categoryName = decodeURIComponent(params["categoryName"]);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);

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
    const query = `?MainCategory=${categoryName}&page=1${
      !!current.toString() ? `&${current.toString()}` : ""
    }${
      !!searchParams.get(categoryName)
        ? `&SubCategory=${encodeURIComponent(subCategory)}`
        : ""
    }`;

    axios
      .get<{
        totalPages: number;
        currentPage: number;
        products: ProductType[];
      }>(
        `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [categoryName, searchParams]);

  return (
    <div className="flex flex-col pb-10">
      <div className="mb-10 flex pt-[117px] max-md:pt-32">
        <FilterBar setDesc={setDesc} />
        <div className="flex w-full flex-col gap-3 px-[3vw] pb-10 pt-5 text-justify sm:pl-4">
          {/* Descriptiom */}
          <div className="font-semibold capitalize">{route.join(" / ")}</div>
          <div className="text-gray-500">{desc}</div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
            {Array(30)
              .fill(null)
              .map((_, index) => (
                <DummyProductCard key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
