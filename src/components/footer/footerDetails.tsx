import { FC } from "react";
import FooterDetailsCard from "./footerDetailsCard";
import { BsFacebook, BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import {
  FooterBestSellers,
  FooterCategory,
  FooterNewArrivals,
} from "./footerComponents";

const FooterDetails: FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-gray-100 px-[3vw] py-10 text-[16px] font-normal">
      <div className="grid w-full grid-cols-2 justify-between gap-10 md:grid-cols-5">
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
            {
              inWebsiteLink: true,
              title: "Testimonial",
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
              title: "Customization",
              link: "/customFitting",
            },
            {
              inWebsiteLink: true,
              title: "Return Policy",
              link: "/return",
            },
            {
              inWebsiteLink: true,
              title: "Payment Policy",
              link: "/paymentPolicy",
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
                inWebsiteLink: false,
                link: "tel:911234567890",
              },
              {
                title: "+91-0987654321",
                inWebsiteLink: false,
                link: "tel:910987654321",
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
        <div className="mb-5 flex flex-col gap-2">
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
              <BsYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <FooterNewArrivals />
        <FooterBestSellers />
      </div>
      <div className="mt-7 flex justify-between gap-2 max-md:flex-col">
        <span>Design and development by 🖤 Growtecs</span>
        <span>© 2020 - 2023 Sanskruti NX All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default FooterDetails;
