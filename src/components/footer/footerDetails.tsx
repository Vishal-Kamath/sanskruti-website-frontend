import { FC } from "react";
import FooterDetailsCard from "./footerDetailsCard";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import FooterCategory from "./footerCategories";

const FooterDetails: FC = () => {
  return (
    <div className="flex w-full flex-col gap-5 bg-gray-100 py-10">
      <div className="justify-betweenl grid w-full grid-cols-2 gap-10 px-[3vw] md:grid-cols-5">
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
              inWebsiteLink: false,
              title: "Blog",
              link: "#",
            },
            {
              inWebsiteLink: true,
              title: "testimonial",
              link: "/testimonial",
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
              title: "Shipping",
              link: "/shipping",
            },
            {
              inWebsiteLink: true,
              title: "Return Policy",
              link: "/return",
            },
            {
              inWebsiteLink: true,
              title: "FAQ's",
              link: "/faqs",
            },
          ]}
        />
        <div className="flex flex-col gap-2">
          <FooterDetailsCard
            title="GET IN TOUCH"
            list={[
              {
                title: "+91-1234567890",
              },
              {
                title: "+91-0987654321",
              },
            ]}
          />
          <FooterDetailsCard
            title="EMAIL US ON"
            list={[
              {
                inWebsiteLink: false,
                title: "info@sanskruti.com",
                link: "mailto:info@sanskruti.com",
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h5 className="flex items-center justify-between py-2 font-bold">
              <span>FOLLOW US</span>
            </h5>
            <div className="flex gap-4 [&>*>*]:h-5 [&>*>*]:w-5">
              <a href="#" target="_blank">
                <BsInstagram />
              </a>
              <a href="#" target="_blank">
                <BsFacebook />
              </a>
              <a href="#" target="_blank">
                <BsWhatsapp />
              </a>
              <a href="#" target="_blank">
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 px-[3vw] max-md:flex-col">
        <span>Design and development by 🖤 Growtecs</span>
        <span>© 2020 - 2023 Sanskruti NX All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default FooterDetails;
