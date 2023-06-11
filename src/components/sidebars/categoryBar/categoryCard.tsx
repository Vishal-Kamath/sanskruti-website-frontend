import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  main: string;
  link: string;
}
const CategoryCard: FC<Props> = ({ main, image, link }) => {
  return (
    <Link
      href={link}
      className="relative isolate flex aspect-[2/3] h-full w-full overflow-hidden rounded-lg p-2"
    >
      <Image
        src={image}
        alt={main}
        width={200}
        height={500}
        className="absolute left-0 top-0 -z-10 h-full w-full rounded-md object-cover object-top"
      />
      <div className="mt-auto flex h-10 w-full items-center justify-center rounded-md bg-white bg-opacity-70">
        {main}
      </div>
    </Link>
  );
};

export default CategoryCard;
