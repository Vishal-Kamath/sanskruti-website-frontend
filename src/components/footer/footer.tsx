import React from 'react';
import VisitOurStore from './visitOurStore';
import FooterDetails from './footerDetails';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto flex flex-col gap-3">
      <a href="" className="px-[5vw]" target="_blank">
        <img
          src="/assets/footerInstagramImage.png"
          alt="Visit our instagram diaries"
          className="w-full"
        />
      </a>

      {/* <VisitOurStore /> */}

      <FooterDetails />
    </footer>
  );
};

export default Footer;
