import VisitOurStore from "@/components/footer/visitOurStore";
import Carousel from "@/components/mainCarousel";
import NewArrival from "@/app/component/newArrivals";
import CategoryBar from "@/components/sidebars/categoryBar/categoryBar";
import SubBanner from "@/components/subBanners";
import UserReviewCarousel from "@/components/userReviewCarousel";
import { NextPage } from "next";
import BestSellers from "./component/bestSeller";
import FeaturedProducts from "./component/featured";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-20 pb-10 pt-36">
      <Carousel />
      <CategoryBar />
      <SubBanner />
      <NewArrival />
      <BestSellers />
      <FeaturedProducts />
      <UserReviewCarousel />
      <VisitOurStore />
    </main>
  );
};

export default Home;
