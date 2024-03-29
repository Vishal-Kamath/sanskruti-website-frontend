import { ProductType } from "@/components/header/header";
import axios from "axios";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { productSlug: string };
}): Promise<Metadata> {
  try {
    const product = (
      await axios.get<{ productAlreadyExists: ProductType }>(
        `${process.env.ENDPOINT}/api/v1/user/product?slug=${params.productSlug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data.productAlreadyExists;

    return {
      title: product.meta_tittle,
      description: product.meta_description,
      keywords: product.meta_keyword,
    };
  } catch {
    return {};
  }
}

interface Props {
  children: ReactNode;
}
const ProductLayoutPage: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProductLayoutPage;
