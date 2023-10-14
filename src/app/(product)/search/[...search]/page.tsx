import Pagination from "@/components/common/pagination";
import { ResultType } from "../../category/[...categories]/page";
import axios from "axios";
import { Fragment } from "react";
import ProductCard from "@/components/productCard";
import PriceSetter from "@/components/sidebars/filterBar/priceSetter";

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { search: string[] };
  searchParams: { [key: string]: string };
}) => {
  const searchArgs = params.search;
  const MainCategory =
    searchArgs[0] !== "_" ? `MainCategory=${searchArgs[0]}` : "";
  const SubCategory =
    searchArgs[1] !== "_" ? `&SubCategory=${searchArgs[1]}` : "";
  const search = searchArgs[2] !== "_" ? `&search=${searchArgs[2]}` : "";
  const searchQuery = new URLSearchParams(searchParams).toString()
    ? `&${new URLSearchParams(searchParams).toString()}`
    : "";

  const query = `?${MainCategory}${SubCategory}${search}${searchQuery}`;

  const result = (
    await axios.get<ResultType>(
      `${process.env.ENDPOINT}/api/v1/user/getallProductsFromSearchFilters${query}`,
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
      <PriceSetter min={result.minValue || 0} max={result.maxValue || 10000} />
      <div className="grid h-fit w-full grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
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

export default SearchPage;
