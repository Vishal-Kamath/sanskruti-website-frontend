import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/redux/slice/category.slice";

const CategoryCard: FC<CategoryType> = (category) => {
  return (
    <Link
      href={`/category/${category.Title}`}
      className="relative isolate flex aspect-[2/3] h-full w-full overflow-hidden rounded-lg p-2"
    >
      <Image
        src={category.Image}
        alt={category.Title + " image"}
        width={200}
        height={500}
        className="absolute left-0 top-0 -z-10 h-full w-full rounded-md object-cover object-top"
      />
      <div className="mt-auto flex h-10 w-full items-center justify-center rounded-md bg-white bg-opacity-70 capitalize">
        {category.Title}
      </div>
    </Link>
  );
};

export default CategoryCard;
