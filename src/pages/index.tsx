import Carousel from '@/components/carousel';
import CategoryBar from '@/components/sidebars/categoryBar/categoryBar';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-5 pb-10 pt-24 max-md:pt-36">
      <CategoryBar />
      <Carousel />
    </main>
  );
};

export default Home;
