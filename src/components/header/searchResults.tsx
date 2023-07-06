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
        "fixed top-[75px] grid max-h-[30rem] w-full bg-white shadow-md max-md:top-28 md:right-[3vw] md:max-w-[39rem] md:grid-cols-2",
        className
      )}
      {...props}
    >
      {searchResults.length !== 0 ? (
        <>
          {searchResults.map((product) => {
            const price = !!product.varients.variations[0]?.discount
              ? product.varients.variations[0]?.price *
                ((100 - product.varients.variations[0]?.discount) / 100)
              : product.varients.variations[0]?.price;

            return (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="flex gap-3 p-2 hover:bg-slate-100"
              >
                <div className="h-[6rem] w-[4rem]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <div>
                    {product.name.length > 35
                      ? `${product.name.slice(0, 35)}...`
                      : product.name}
                  </div>
                  <div className="flex gap-1">
                    {!!product.varients.variations[0]?.discount ? (
                      <>
                        <span>&#8377;{price}</span>
                        <s className="text-gray-500">
                          &#8377;{product.varients.variations[0]?.price}
                        </s>
                        <span className="font-bold text-red-800">
                          ({product.varients.variations[0].discount}% OFF)
                        </span>
                      </>
                    ) : (
                      <div>&#8377;{price}</div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      ) : (
        <div className="col-span-full p-3 text-center text-lg">
          Not Results found
        </div>
      )}
    </div>
  );
};

export default SearchResults;
