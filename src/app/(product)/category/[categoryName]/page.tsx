import ProductCard from "@/components/productCard";
import { Fragment } from "react";
import axios from "axios";
import { ProductType } from "@/components/header/header";
import Pagination from "@/components/common/pagination";
import { Metadata } from "next";
import { CategoryStateType } from "@/redux/slice/category.slice";

type ResultType = {
  totalPages: number;
  currentPage: number;
  products: ProductType[];
};

export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  const { categories } = (
    await axios.get<CategoryStateType>(
      `${process.env.ENDPOINT}/api/v1/user/categories?keyword=${params.categoryName}`
    )
  ).data;
  const category = categories[0];
  return {
    title:
      category?.Meta_Title ||
      `Sanskruti Nx - ${decodeURIComponent(params.categoryName)}`,
    description: category?.Meta_Description,
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { categoryName: string };
  searchParams: { [key: string]: string };
}) => {
  const current = new URLSearchParams(searchParams);
  const categoryName = params.categoryName;
  const subCategory = searchParams[decodeURIComponent(params.categoryName)];

  current.delete(categoryName);
  const query = `?MainCategory=${categoryName}${
    !!current.toString() ? `&${current.toString()}` : ""
  }${
    !!searchParams[categoryName]
      ? `&SubCategory=${encodeURIComponent(subCategory)}`
      : ""
  }`;
  const result = (
    await axios.get<ResultType>(
      `${process.env.ENDPOINT}/api/v1/user/getallProductsFromFilters${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).data;
  const products = result.products;

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default CategoryPage;
