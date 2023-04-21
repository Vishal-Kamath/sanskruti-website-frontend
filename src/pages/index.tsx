import Carousel from '@/components/carousel';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="max-md:pt-36 pt-24 px-[4vw]">
      <Carousel />
    </main>
  );
};

export default Home;
