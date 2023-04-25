import FilterBar from '@/components/sidebars/filterBar/filterBar';
import { setFilter } from '@/slice/filter.slice';
import { useAppDispatch } from '@/store/hooks';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const CategoryPage: NextPage<{ categoryName: string }> = ({ categoryName }) => {
  const dispatch = useAppDispatch();
  dispatch(setFilter(categoryName));
  return (
    <>
      <Head>
        <title>{`Category - ${categoryName}`}</title>
      </Head>
      <div className="mb-10 border-b-2 border-gray-300 pt-24 max-md:pt-36">
        <div className="grid h-[10rem] w-full place-content-center bg-slate-950 text-white">
          <span className="font-poppins text-2xl font-semibold">
            {categoryName}
          </span>
        </div>

        <div className="flex">
          <FilterBar />
          <div className="flex w-full flex-col gap-3 pr-[5vw] pt-5 text-justify sm:pl-4">
            {/* Descriptiom */}
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              sequi officia dolorem temporibus reiciendis tenetur aliquid rerum
              placeat esse eligendi quod quos voluptate, corrupti distinctio
              quae provident! Debitis, dolore repellendus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Laudantium fugiat laborum aut
              provident amet odio, vero earum corporis voluptatibus maiores
              expedita, odit iusto qui quae neque illo incidunt, debitis
              quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Iusto eaque voluptatum, sapiente fuga dolore assumenda aspernatur!
              Consequatur nesciunt assumenda reiciendis temporibus sunt.
              Perspiciatis veniam, dolorem unde numquam neque aliquam a.
            </div>

            {/* Sort */}
            <div className="relative ml-auto h-9 w-[15rem] overflow-hidden rounded-md border-2 border-black">
              <select
                className="absolute left-0 top-0 h-9 w-full pl-16 font-semibold outline-none"
                name="sort"
                id="sort"
              >
                <option value="new">New</option>
                <option value="price:htl">Price: high to low</option>
                <option value="price:lth">Price: low to high</option>
              </select>
              <span className="absolute left-0 grid h-9 w-16 place-content-center">
                Sort by:
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const categoryName = params?.categoryName;
  if (!categoryName) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }

  return {
    props: {
      categoryName,
    },
  };
};
