import ProductCard from '@/components/productCard/productCard';
import { NextPage } from 'next';

const WishListPage: NextPage = () => {
  const ItemLength = 7;
  return (
    <div className="flex flex-col gap-5 px-[5vw] pb-10 pt-24 max-md:pt-36">
      <h1 className="flex items-baseline gap-4 border-b-2 border-gray-300 pb-5">
        <span className="text-xl font-bold">My Wishlist</span>
        <span className="text-lg">{ItemLength} items</span>
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(ItemLength)
          .fill(null)
          .map((value, index) => (
            <ProductCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default WishListPage;
