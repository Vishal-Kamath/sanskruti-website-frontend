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

  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());

    current.delete(categoryName);
    const query = `?MainCategory=${categoryName}&page=1${
      !!current.toString() ? `&${current.toString()}` : ""
    }${
      !!searchParams.get(categoryName)
        ? `&SubCategory=${encodeURIComponent(searchParams.get(categoryName)!)}`
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
    <div className="mb-10 border-b-2 border-gray-300 pt-[93px] max-md:pt-28">
      <div className="grid h-[5rem] w-full place-content-center bg-slate-800">
        <span className="font-poppins text-2xl font-semibold text-white">
          {categoryName}
        </span>
      </div>
      <div className="flex">
        <FilterBar />
        <div className="flex w-full flex-col gap-3 px-[3vw] pb-10 pt-5 text-justify sm:pl-4">
          {/* Descriptiom */}
          <div className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            sequi officia dolorem temporibus reiciendis tenetur aliquid rerum
            placeat esse eligendi quod quos voluptate, corrupti distinctio quae
            provident! Debitis, dolore repellendus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium fugiat laborum aut
            provident amet odio, vero earum corporis voluptatibus maiores
            expedita, odit iusto qui quae neque illo incidunt, debitis quisquam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eaque
            voluptatum, sapiente fuga dolore assumenda aspernatur! Consequatur
            nesciunt assumenda reiciendis temporibus sunt. Perspiciatis veniam,
            dolorem unde numquam neque aliquam a.
          </div>

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
