import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const ProductCard: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const slug = 'product-slug';
  return (
    <Link
      href={`/product/${slug}`}
      className="relative rounded-md border-2 border-gray-300 p-2"
    >
      <div className="h-[25rem] w-full rounded-md bg-gray-200">
        <div className="absolute right-5 top-5 grid h-8 w-8 place-content-center rounded-full border-2 border-gray-300 bg-white">
          <input
            type="checkbox"
            name="like"
            id="like"
            onChange={() => setLiked(!liked)}
            className="absolute left-0 top-0 h-full w-full opacity-0"
          />
          {liked ? (
            <AiFillHeart className="h-6 w-6 text-red-600" />
          ) : (
            <AiOutlineHeart className="h-6 w-6" />
          )}
        </div>
      </div>
      <div>
        <div>
          Mint Green Printed Palazzo Suit In Chanderi With Embroidery Mint Green
          Printed
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Rs. 4,000</span>
          <s className="text-sm">4,440</s>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
