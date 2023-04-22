import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

const VisitOurStore: React.FC = () => {
  return (
    <div className="flex justify-between max-md:flex-col">
      <div className="relative">
        <img src="assets/storeImage.png" alt="Sanskruti Store" />
        <a
          href="https://goo.gl/maps/LaGnDHJ6WhTNJDsGA"
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white p-1"
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
