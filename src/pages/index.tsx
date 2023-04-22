import Carousel from '@/components/carousel';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="px-[4vw] pt-24 max-md:pt-36">
      <Carousel />
    </main>
  );
};

export default Home;
