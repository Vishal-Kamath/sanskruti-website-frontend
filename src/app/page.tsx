import ProductCarousel from "@/components/common/productCarousel";
import Carousel from "@/components/mainCarousel";
import CategoryBar from "@/components/sidebars/categoryBar/categoryBar";
import UserReviewCarousel from "@/components/userReviewCarousel";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-5 pb-10 pt-[93px] max-md:pt-28">
      <Carousel />
      <CategoryBar />
      <ProductCarousel />
      <ProductCarousel />
      <UserReviewCarousel />
    </main>
  );
};

export default Home;
