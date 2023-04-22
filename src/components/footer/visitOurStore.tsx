import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

const VisitOurStore: React.FC = () => {
  return (
    <div className="flex max-md:flex-col justify-between">
      <div className="relative">
        <img src="assets/storeImage.png" alt="Sanskruti Store" />
        <a
          href="https://goo.gl/maps/LaGnDHJ6WhTNJDsGA"
          className="bg-white absolute flex gap-1 items-center rounded-md p-1 bottom-2 right-2"
          target="_blank"
        >
          View Details
          <BiLinkExternal className="text-lg" />
        </a>
      </div>
      <div>
        <span>
          Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, opp. Suchak Petrol
          Pump, Kalyan(W), Maharashtra 421301
        </span>
      </div>
    </div>
  );
};

export default VisitOurStore;
