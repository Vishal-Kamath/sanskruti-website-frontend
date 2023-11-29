import { FC } from "react";
import FooterDetailsCard from "./footerDetailsCard";
import { BsFacebook, BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import {
  FooterBestSellers,
  FooterCategory,
  FooterNewArrivals,
} from "./footerComponents";
import FooterSocial from "./footerSocial";
import ContactNumber from "../common/contackNumber";

const FooterDetails: FC = () => {
  return (
    <div className="flex w-full flex-col items-center gap-6 bg-gray-100 px-[3vw] py-10 text-sm font-normal">
      <div className="grid w-full max-w-5xl grid-cols-2 justify-between gap-10 md:grid-cols-5">
        <FooterCategory />
        <FooterDetailsCard
          title="ABOUT US"
          list={[
            {
              inWebsiteLink: true,
              title: "About Us",
              link: "/aboutus",
            },
            {
              inWebsiteLink: true,
              title: "Contact Us",
              link: "/contactUs",
            },
            {
              inWebsiteLink: true,
              title: "Blog",
              link: "/blog",
            },
          ]}
        />

        <FooterDetailsCard
          title="POLICIES"
          list={[
            {
              inWebsiteLink: true,
              title: "Terms & Conditions",
              link: "/terms&Conditions",
            },
            {
              inWebsiteLink: true,
              title: "Return Policy",
              link: "/return",
            },
            {
              inWebsiteLink: true,
              title: "Privacy Policy",
              link: "/privacyPolicy",
            },
          ]}
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h5 className="flex items-center justify-between py-2 font-semibold">
              <span>GET IN TOUCH</span>
            </h5>
            <div className="flex flex-col gap-1 py-1">
              <ContactNumber />
            </div>
          </div>
          <FooterDetailsCard
            title="EMAIL US ON"
            list={[
              {
                inWebsiteLink: false,
                title: "info@sanskrutinx.com",
                link: "mailto:info@sanskrutinx.com",
              },
            ]}
          />
        </div>
        <FooterSocial />
      </div>
      <div className="flex max-w-5xl flex-col gap-5">
        <FooterNewArrivals />
        <FooterBestSellers />
      </div>
      <div className="mt-7 flex w-full max-w-5xl justify-between gap-2 max-md:flex-col">
        <span>Design and development by 🖤 Growtecs</span>
        <span>© 2020 - 2023 Sanskruti NX All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default FooterDetails;
