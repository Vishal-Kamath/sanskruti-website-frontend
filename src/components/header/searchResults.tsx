import { FC, HTMLAttributes } from "react";
import { ProductType } from "./header";
import { cn } from "@/utils/lib";
import Link from "next/link";
import Image from "next/image";

interface Props extends HTMLAttributes<HTMLDivElement> {
  searchResults: ProductType[];
}
const SearchResults: FC<Props> = ({ searchResults, className, ...props }) => {
  return (
    <div
      className={cn(
        "ove fixed top-[68px] flex max-h-[30rem] w-full flex-col border-x-2 border-b-2 border-gray-300 bg-white max-md:top-28 md:right-[3vw] md:max-w-lg",
        className
      )}
      {...props}
    >
      {searchResults.length !== 0 ? (
        <>
          {searchResults.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              className="flex gap-3 p-2 hover:bg-gray-50"
            >
              <div className="h-[6rem] w-[4rem] bg-gray-200"></div>
              <div className="flex flex-col justify-center gap-1">
                <div>
                  {product.name.length > 25
                    ? `${product.name.slice(0, 25)}...`
                    : product.name}
                </div>
                <div className="flex gap-1">
                  {!!product.sale_price ? (
                    <>
                      <div>{product.sale_price}</div>
                      <s>{product.gst_price}</s>
                    </>
                  ) : (
                    <div>{product.gst_price}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="p-3 text-center text-lg">Not Results found</div>
      )}
    </div>
  );
};

export default SearchResults;
