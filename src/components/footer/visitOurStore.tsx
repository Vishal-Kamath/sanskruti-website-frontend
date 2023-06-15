import Image from "next/image";
import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";

const VisitOurStore: FC = () => {
  return (
    <div
      id="visitOurStore"
      className="isolate flex flex-col gap-4 px-[3vw] py-5"
    >
      <div className="text-center text-lg font-bold">VISIT OUR STORE</div>
      <a
        target="_blank"
        href="https://goo.gl/maps/LaGnDHJ6WhTNJDsGA"
        title="Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, Opposite Suchak Petrol Pump, Kalyan(West), Maharashtra 421301"
        className="relative w-full overflow-hidden"
      >
        <Image
          src="/assets/storeImage.png"
          className="absolute -z-10 h-full w-full object-cover opacity-80"
          width={50}
          height={50}
          alt="Sanskruti Store"
        />
        <Image
          src="/assets/storeImage.png"
          className="h-[55vh] w-full object-contain"
          width={500}
          height={500}
          alt="Sanskruti Store"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white p-1 px-3 text-xl">
          View Details
          <BiLinkExternal />
        </div>
      </a>
    </div>
  );
};

export default VisitOurStore;
