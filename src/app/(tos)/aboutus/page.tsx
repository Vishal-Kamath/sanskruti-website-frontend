import VisitOurStore from "@/components/footer/visitOurStore";
import { NextPage } from "next";
import Image from "next/image";
import CustomerCare from "./cutomerCare";

const AboutUsPage: NextPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-[3vw] pb-16 pt-48 text-lg">
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute top-1/2 -z-10 mx-auto w-full max-w-xl -translate-y-1/2 border-b-[1px] border-slate-500 outline-none"></div>
        <Image
          src="/assets/sanskruti-logo.svg"
          alt="Sanskruti Logo"
          width={150}
          height={150}
          className="aspect-auto w-full max-w-[15rem] bg-white px-5"
        />
      </div>

      <div className="text-justify text-sm text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laborum
        assumenda voluptatem nam nemo, ut, reiciendis recusandae, minima autem
        in velit consequuntur magnam praesentium quisquam cupiditate? Asperiores
        perferendis architecto ipsa? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Omnis voluptas delectus sapiente, blanditiis soluta
        totam ipsam hic sequi distinctio laudantium sunt odit, officia corporis
        eius dolorum, quasi rem similique consectetur.
      </div>

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-xl font-semibold">Mission</h3>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          quibusdam sit sed quia veritatis adipisci unde in quaerat earum
          repellat deserunt velit dolorum non vero culpa quod itaque reiciendis
          praesentium.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-xl font-semibold">Vision</h3>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          quibusdam sit sed quia veritatis adipisci unde in quaerat earum
          repellat deserunt velit dolorum non vero culpa quod itaque reiciendis
          praesentium.
        </p>
      </div>

      <hr />

      {/* Founders Details */}
      <div className="flex flex-col items-center gap-12">
        <h3 className="text-2xl font-semibold">Founders</h3>

        <div className="flex gap-9 max-md:flex-col">
          <Image
            src="https://placehold.co/300x200/png"
            alt="founder"
            width={300}
            height={200}
            className="aspect-auto h-full w-full"
          />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-xl font-semibold">Name</h3>
            <p className="text-justify text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              quibusdam sit sed quia veritatis adipisci unde in quaerat earum
              repellat deserunt velit dolorum non vero culpa quod itaque
              reiciendis praesentium. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Pariatur earum incidunt sapiente rem autem,
              corrupti amet iure ipsam porro est quos libero obcaecati
              voluptatem corporis quaerat architecto, nulla maxime iste. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Consequatur
              iusto a nulla sint esse dolorum impedit voluptatem enim? Explicabo
              consequatur optio eum? Sequi magni nobis quae maxime cupiditate
              aspernatur reprehenderit.
            </p>
          </div>
        </div>

        <div className="flex gap-9 max-md:flex-col-reverse">
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-xl font-semibold">Name</h3>
            <p className="text-justify text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              quibusdam sit sed quia veritatis adipisci unde in quaerat earum
              repellat deserunt velit dolorum non vero culpa quod itaque
              reiciendis praesentium. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Pariatur earum incidunt sapiente rem autem,
              corrupti amet iure ipsam porro est quos libero obcaecati
              voluptatem corporis quaerat architecto, nulla maxime iste. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Consequatur
              iusto a nulla sint esse dolorum impedit voluptatem enim? Explicabo
              consequatur optio eum? Sequi magni nobis quae maxime cupiditate
              aspernatur reprehenderit.
            </p>
          </div>
          <Image
            src="https://placehold.co/300x200/png"
            alt="founder"
            width={300}
            height={200}
            className="aspect-auto h-full w-full"
          />
        </div>
      </div>

      <hr />

      {/* Features */}
      <div className="flex flex-col items-center gap-9">
        <h3 className="text-2xl font-semibold">Features</h3>

        <div className="flex justify-between gap-12 max-md:flex-col md:gap-9">
          <div className="flex flex-col items-center gap-6 text-center text-[16px]">
            <Image
              src="https://placehold.co/300x300/png"
              alt="feature"
              width={300}
              height={300}
              className="aspect-square h-full w-full max-w-[10rem] rounded-full"
            />
            <h4>Title 1</h4>
            <p className="max-w-lg text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              fugiat eum voluptatibus maiores consequuntur earum asperiores
              illum necessitatibus atque. Illo porro veniam vel odit aspernatur.
              Eaque beatae earum enim debitis!
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 text-center text-[16px]">
            <Image
              src="https://placehold.co/300x300/png"
              alt="feature"
              width={300}
              height={300}
              className="aspect-square h-full w-full max-w-[10rem] rounded-full"
            />
            <h4>Title 2</h4>
            <p className="max-w-lg text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              fugiat eum voluptatibus maiores consequuntur earum asperiores
              illum necessitatibus atque. Illo porro veniam vel odit aspernatur.
              Eaque beatae earum enim debitis!
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 text-center text-[16px]">
            <Image
              src="https://placehold.co/300x300/png"
              alt="feature"
              width={300}
              height={300}
              className="aspect-square h-full w-full max-w-[10rem] rounded-full"
            />
            <h4>Title 3</h4>
            <p className="max-w-lg text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              fugiat eum voluptatibus maiores consequuntur earum asperiores
              illum necessitatibus atque. Illo porro veniam vel odit aspernatur.
              Eaque beatae earum enim debitis!
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Our Store */}
      <div className="flex flex-col gap-9">
        <VisitOurStore />
      </div>

      <hr />

      {/* Customer Care */}
      <div className="flex flex-col gap-9">
        <h3 className="text-2xl font-semibold">Customer Care</h3>
        <CustomerCare />
      </div>
    </div>
  );
};

export default AboutUsPage;
