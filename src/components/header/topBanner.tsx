import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

const TopBanner: React.FC = () => {
  return (
    <div className="flex justify-between bg-black px-[5vw] py-1 text-white max-lg:justify-center">
      <div className="flex items-center gap-2 text-sm max-lg:hidden">
        <FiPhoneCall />
        <span>+91-1234567890</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <img src="/assets/truck.svg" alt="Shipping truck" />
        <span>Free Shipping in India</span>
      </div>
      <a
        href="#visitOurStore"
        className="flex items-center gap-2 text-sm max-lg:hidden"
      >
        <MdLocationOn className="text-lg" />
        <span>Visit Our Store</span>
      </a>
    </div>
  );
};

export default TopBanner;
