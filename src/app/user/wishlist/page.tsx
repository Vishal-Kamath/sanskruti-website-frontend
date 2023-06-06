import { FC } from "react";
import Container from "../components/container";
import ProductCard from "@/components/productCard";
import UIButton from "@/components/common/button";

const WishListPage: FC = () => {
  return (
    <Container containerTitle="WishList">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <div className="flex flex-col gap-2">
              <ProductCard key={index} />
              <UIButton>Add to cart</UIButton>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default WishListPage;
