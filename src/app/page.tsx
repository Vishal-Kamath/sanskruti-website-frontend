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

      <div className="grid grid-cols-2 justify-between gap-10 px-[9vw] py-5 md:grid-cols-3">
        <Link
          href="/shipping"
          className="group relative isolate mx-auto flex h-full w-fit flex-col items-center gap-2 transition-all duration-300 ease-in-out"
        >
          <Image
            className="h-14 w-14 object-center"
            src="/assets/free-delivery.png"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Free Shipping</div>
          <div className="absolute left-1/2 top-1/2 -z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 transition-all duration-300 ease-in-out group-hover:h-24 group-hover:w-24"></div>{" "}
        </Link>
        <Link
          href="/return"
          className="group relative isolate mx-auto flex h-full w-fit flex-col items-center gap-2 transition-all duration-300 ease-in-out"
        >
          <Image
            className="h-14 w-14 object-center"
            src="/assets/easy-return.png"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Easy Return</div>
          <div className="absolute left-1/2 top-1/2 -z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 transition-all duration-300 ease-in-out group-hover:h-24 group-hover:w-24"></div>{" "}
        </Link>
        <Link
          href="/customFitting"
          className="group relative isolate mx-auto flex h-full w-fit flex-col items-center gap-2 transition-all duration-300 ease-in-out max-md:col-span-full"
        >
          <Image
            className="h-14 w-14 object-center"
            src="/assets/custom-fitting.svg"
            alt="easy return"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs lg:text-lg">Custom Fitting</div>
          <div className="absolute left-1/2 top-1/2 -z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 transition-all duration-300 ease-in-out group-hover:h-24 group-hover:w-24"></div>
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
