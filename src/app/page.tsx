import VisitOurStore from "@/components/footer/visitOurStore";
import Carousel from "@/components/mainCarousel";
import NewArrival from "@/app/component/newArrivals";
import CategoryBar from "@/components/sidebars/categoryBar/categoryBar";
import SubBanner from "@/components/subBanners";
import UserReviewCarousel from "@/components/userReviewCarousel";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import BestSellers from "./component/bestSeller";
import FeaturedProducts from "./component/featured";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-5 pb-10 pt-36">
      <Carousel />
      <CategoryBar />
      <SubBanner />
      <NewArrival />
      <BestSellers />
      <FeaturedProducts />
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
