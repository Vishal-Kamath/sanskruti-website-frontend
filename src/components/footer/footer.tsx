import { FC } from "react";
import FooterDetails from "./footerDetails";

const Footer: FC = () => {
  return (
    <footer className="mt-auto flex flex-col gap-3">
      <FooterDetails />
    </footer>
  );
};

export default Footer;
