import ProductCard from "@/components/productCard";
import { Fragment } from "react";
import axios from "axios";
import { ProductType } from "@/components/header/header";
import Pagination from "@/components/common/pagination";
import { Metadata } from "next";
import { CategoryStateType } from "@/redux/slice/category.slice";

export type ResultType = {
  totalPages: number;
  currentPage: number;
  products: ProductType[];
};

export async function generateMetadata({
  params,
}: {
  params: { categories: string[] };
}): Promise<Metadata> {
  const { categories } = (
    await axios.get<CategoryStateType>(
      `${process.env.ENDPOINT}/api/v1/user/categories?keyword=${params.categories[0]}`
    )
  ).data;
  const category = categories[0];
  return {
    title:
      category?.Meta_Title ||
      `Sanskruti Nx - ${decodeURIComponent(params.categories[0])}`,
    description: category?.Meta_Description,
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { categories: string[] };
  searchParams: { [key: string]: string };
}) => {
  const categoriesArgs = params.categories;
  const MainCategory =
    categoriesArgs[0] !== "_" ? `MainCategory=${categoriesArgs[0]}` : "";
  const SubCategory =
    categoriesArgs[1] !== "_" ? `&SubCategory=${categoriesArgs[1]}` : "";
  const searchQuery = new URLSearchParams(searchParams).toString()
    ? `&${new URLSearchParams(searchParams).toString()}`
    : "";

  const query = `?${MainCategory}${SubCategory}${searchQuery}`;
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
      <div className="grid h-fit grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
        {products.length ? (
          products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))
        ) : (
          <h3 className="col-span-full mt-6 text-center text-xl">
            No Products Found
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
