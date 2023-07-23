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

      <div className="flex justify-evenly pb-5">
        <Link href="#" className="flex h-full flex-col items-center gap-2">
          <Image
            className="h-8 w-8 object-center lg:h-10 lg:w-10"
            src="/assets/shippingTruck.svg"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs">Free Shipping</div>
        </Link>
        <Link href="#" className="flex h-full flex-col items-center gap-2">
          <Image
            className="h-8 w-8 object-center lg:h-10 lg:w-10"
            src="/assets/easyReturn.svg"
            alt="shipping truck"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs">Easy Return</div>
        </Link>
        <Link href="#" className="flex h-full flex-col items-center gap-2">
          <Image
            className="h-8 w-8 object-center lg:h-10 lg:w-10"
            src="/assets/customFitting.svg"
            alt="easy return"
            width={50}
            height={50}
          />
          <div className="max-lg:text-xs">Custom Fitting</div>
        </Link>
      </div>

      <CategoryBar />
      <ProductCarousel />
      <SubBanner />
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
