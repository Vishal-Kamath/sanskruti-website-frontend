"use client";

import { ProductType } from "@/components/header/header";
import axios from "axios";
import ProductPageComponent from "./components/productPage";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ProductPage: FC = () => {
  const params = useParams();
  const productSlug = params["productSlug"];

  const [product, setProduct] = useState<ProductType>();

  const getProduct = async (slug: string) => {
    const newProduct = (
      await axios.get<{ productAlreadyExists: ProductType }>(
        `${process.env.ENDPOINT}/api/v1/user/product?slug=${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data.productAlreadyExists;
    setProduct(newProduct);
  };
  useEffect(() => {
    getProduct(productSlug);
  }, [productSlug]);

  return !!product ? <ProductPageComponent product={product} /> : null;
};

export default ProductPage;
