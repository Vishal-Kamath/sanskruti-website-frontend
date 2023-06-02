import { FC } from "react";
import FooterDetails from "./footerDetails";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="mt-auto flex flex-col gap-3">
      <a href="" className="px-[5vw]" target="_blank">
        <Image
          src="/assets/footerInstagramImage.png"
          alt="Visit our instagram diaries"
          width={300}
          height={300}
          className="w-full"
        />
      </a>

      <FooterDetails />
    </footer>
  );
};

export default Footer;
