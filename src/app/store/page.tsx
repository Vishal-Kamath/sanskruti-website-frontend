import UIButton from "@/components/common/button";
import UIGoogleMap from "@/components/common/map";
import UserReviewCarousel from "@/components/userReviewCarousel";
import Image from "next/image";
import { FC } from "react";

const StorePage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col gap-5 pb-10 pt-36">
      <div className="relative isolate mb-[20rem] w-full sm:mb-[6rem] sm:px-[3vw]">
        <Image
          src="/assets/storeImage.png"
          alt="store image"
          width={1500}
          height={1500}
          className="h-[40vh] w-full object-cover sm:h-[60vh] sm:rounded-b-xl"
        />
        <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 translate-y-[20rem] px-[3vw] sm:translate-y-[5rem]">
          <div className="mx-auto flex w-full max-w-4xl justify-between gap-4 rounded-md border-[1px] border-slate-300 bg-white p-5 max-sm:flex-col">
            <div className="flex flex-col gap-3 text-[16px] sm:text-lg">
              <h3 className="text-lg font-bold sm:text-xl">
                Sanskruti Nx at Kalyan
              </h3>
              <div className="max-w-xs">
                Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, Opposite
                Suchak Petrol Pump, Kalyan(West), Maharashtra 421301
              </div>
              <a
                className="mt-auto"
                target="_blank"
                href="https://goo.gl/maps/LaGnDHJ6WhTNJDsGA"
              >
                <UIButton className="w-fit border-[1px] border-gray-400 px-3">
                  Get Directions
                </UIButton>
              </a>
            </div>
            <UIGoogleMap
              className="aspect-square w-full max-w-[20rem] max-sm:mx-auto sm:h-[15rem] sm:w-[15rem]"
              src="https://maps.google.com/maps?q=Sanskruti+-+Kalyan&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            />
          </div>
        </div>
      </div>
      <UserReviewCarousel />
    </div>
  );
};

export default StorePage;
