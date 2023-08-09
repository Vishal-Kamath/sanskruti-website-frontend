import ProductCarousel from "@/components/common/productCarousel";
import VisitOurStore from "@/components/footer/visitOurStore";
import Carousel from "@/components/mainCarousel";
import CategoryBar from "@/components/sidebars/categoryBar/categoryBar";
import SubBanner from "@/components/subBanners";
import UserReviewCarousel from "@/components/userReviewCarousel";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-5 pb-10 pt-36">
      <Carousel />

      <div className="flex justify-between px-[9vw] py-5">
        <Link
          href="/shipping"
          className="flex h-full flex-col items-center gap-2"
        >
          <Image
            className="h-8 w-8 object-center lg:h-14 lg:w-14"
            src="/assets/free-delivery.png"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Free Shipping</div>
        </Link>
        <Link
          href="/return"
          className="flex h-full flex-col items-center gap-2"
        >
          <Image
            className="h-8 w-8 object-center lg:h-14 lg:w-14"
            src="/assets/easy-return.png"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Easy Return</div>
        </Link>
        <Link
          href="/customFitting"
          className="flex h-full flex-col items-center gap-2"
        >
          <Image
            className="h-8 w-8 object-center lg:h-14 lg:w-14"
            src="/assets/custom-fitting.svg"
            alt="easy return"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Custom Fitting</div>
        </Link>
      </div>

      <CategoryBar />
      <SubBanner />
      <ProductCarousel />
      <ProductCarousel />
      <ProductCarousel />
      <UserReviewCarousel />

      <a href="" className="px-[3vw]" target="_blank">
        <Image
          src="/assets/footerInstagramImage.png"
          alt="Visit our instagram diaries"
          width={600}
          height={600}
          className="w-full"
        />
      </a>

      <VisitOurStore />
    </main>
  );
};

export default Home;
