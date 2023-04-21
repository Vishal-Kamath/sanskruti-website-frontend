import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

const TopBanner: React.FC = () => {
  return (
    <div className="px-[4vw] py-1 flex max-lg:justify-center justify-between bg-black text-white">
      <div className="max-lg:hidden flex items-center gap-2 text-sm">
        <FiPhoneCall />
        <span>+91-1234567890</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <img src="assets/truck.svg" alt="Shipping truck" />
        <span>Free Shipping in India</span>
      </div>
      <div className="max-lg:hidden flex items-center gap-2 text-sm">
        <MdLocationOn className="text-lg" />
        <span>Visit Our Store</span>
      </div>
    </div>
  );
};

export default TopBanner;
