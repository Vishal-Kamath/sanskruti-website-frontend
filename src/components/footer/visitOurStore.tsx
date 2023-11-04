import Image from "next/image";
import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";
import UIHeader from "../common/header";
import Link from "next/link";

const VisitOurStore: FC = () => {
  return (
    <div
      id="visitOurStore"
      className="isolate flex flex-col gap-4 px-[3vw] py-5"
    >
      <UIHeader title="Visit our Store" />
      <Link
        href={"/store"}
        title="Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, Opposite Suchak Petrol Pump, Kalyan(West), Maharashtra 421301"
        className="relative w-full overflow-hidden rounded-lg bg-slate-950"
      >
        <Image
          src="/assets/storeImage.jpg"
          className="h-full max-h-[30rem] w-full object-contain"
          width={500}
          height={500}
          alt="Sanskruti Store"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white p-1 px-3 text-xl">
          View Details
          <BiLinkExternal />
        </div>
      </Link>
    </div>
  );
};

export default VisitOurStore;
