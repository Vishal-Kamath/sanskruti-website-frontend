"use client";

import { ProductType } from "@/components/header/header";
import axios from "axios";
import ProductPageComponent from "./components/productPage";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";

const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productSlug = params["productSlug"];

  const [product, setProduct] = useState<ProductType>();

  const getProduct = async (slug: string) => {
    dispatch(startLoading());
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
    dispatch(completeLoading());
  };
  useEffect(() => {
    getProduct(productSlug);
  }, [productSlug]);

  return !!product ? <ProductPageComponent product={product} /> : null;
};

export default ProductPage;
