import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';

const VisitOurStore: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-t-2 border-gray-500 px-[5vw] py-5">
      <div className="font-bold">VISIT OUR STORE</div>
      <div className="flex justify-between gap-2 max-md:flex-col-reverse">
        <div className="flex flex-col">
          <span>Shop No. 2, 3, 4,</span>
          <span>Yashoda Vinayak Sankul,</span>
          <span>Agra Rd,</span>
          <span>opposite Suchak Petrol Pump,</span>
          <span>Kalyan(West)</span>
          <span>Maharashtra 421301</span>
        </div>
        <div className="relative">
          <img
            src="assets/storeImage.png"
            className="h-[15rem]"
            alt="Sanskruti Store"
          />
          <a
            href="https://goo.gl/maps/LaGnDHJ6WhTNJDsGA"
            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white p-1"
            target="_blank"
          >
            View Details
            <BiLinkExternal className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VisitOurStore;
