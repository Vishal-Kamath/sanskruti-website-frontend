import ProductDetails from '@/components/product/productDetails';
import ProductImageFullScreen from '@/components/product/productImageFullScreen';
import ProductImageDisplay from '@/components/product/productImagesDisplay';
import ProductCard from '@/components/productCard/productCard';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const images = [
  '/temp/productImage1.png',
  '/temp/productImage2.png',
  '/temp/productImage3.png',
];

const ProductPage: NextPage<{ slug: string }> = ({ slug }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImageOpen, setFullscreenImageOpen] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentImageIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };
  return (
    <>
      <Head>
        <title>{`Product - ${slug}`}</title>
      </Head>
      {fullscreenImageOpen && (
        <ProductImageFullScreen
          imageSrc={images[currentImageIndex]}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setFullscreenImageOpen={setFullscreenImageOpen}
        />
      )}
      <div className="mb-10 flex flex-col gap-6 border-b-2 border-gray-300 pt-24 max-md:pt-36">
        <div className="flex items-start gap-5 max-md:flex-col">
          <ProductImageDisplay
            setFullscreenImageOpen={setFullscreenImageOpen}
            images={images}
            currentImageIndex={currentImageIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetails />
        </div>
        <div className="flex flex-col gap-3 px-[5vw]">
          <h3 className="text-xl font-semibold">Similar Products</h3>
          <div className="custom_scrollbar flex gap-3 overflow-y-hidden overflow-x-scroll pb-5 scrollbar">
            {Array(12)
              .fill(null)
              .map((value, index) => (
                <ProductCard key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.productSlug;
  return {
    props: {
      slug,
    },
  };
};
