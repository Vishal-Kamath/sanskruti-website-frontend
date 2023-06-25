import { ProductType } from "@/components/header/header";
import axios from "axios";
import ProductPageComponent from "./components/productPage";
import { Metadata } from "next";

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

const ProductPage = async ({ params }: { params: { productSlug: string } }) => {
  const slug = params["productSlug"];
  const product = (
    await axios.get<{ productAlreadyExists: ProductType }>(
      `${process.env.ENDPOINT}/api/v1/user/product?slug=${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).data.productAlreadyExists;

  return <ProductPageComponent product={product} />;
};

export default ProductPage;
