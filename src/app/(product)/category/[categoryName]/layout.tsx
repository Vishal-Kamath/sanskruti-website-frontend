import { CategoryStateType } from "@/redux/slice/category.slice";
import axios from "axios";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

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

interface Props {
  children?: ReactNode;
}
const CategoryLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
