import { FC } from "react";
import FooterDetailsCard from "./footerDetailsCard";
import VisitOurStore from "./visitOurStore";

const FooterDetails: FC = () => {
  return (
    <div className="flex w-full flex-col gap-5 bg-gray-100 pb-10">
      <div className="flex w-full justify-between max-md:flex-col md:px-[3vw]">
        <FooterDetailsCard
          title="DESIGNER WEAR"
          list={[
            {
              inWebsiteLink: true,
              title: "Salwar Kameez",
              link: "/category/Salwar Kameez",
            },
            {
              inWebsiteLink: true,
              title: "Lehenga's",
              link: "/category/Lehenga's",
            },
            {
              inWebsiteLink: true,
              title: "Indo Western",
              link: "/category/Indo Western",
            },
            {
              inWebsiteLink: true,
              title: "Bridal",
              link: "/category/Bridal",
            },
            {
              inWebsiteLink: true,
              title: "Kurti's",
              link: "/category/Kurti's",
            },
            {
              inWebsiteLink: true,
              title: "Western Wear",
              link: "/category/Western Wear",
            },
            {
              inWebsiteLink: true,
              title: "Dress Material's",
              link: "/category/Dress Material's",
            },
          ]}
        />
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
              link: "/return policy",
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
      </div>
      <div className="flex justify-between gap-2 px-[3vw] max-md:flex-col">
        <span>Design and development by 🖤 Growtecs</span>
        <span>© 2020 - 2023 Sanskruti NX All Rights Reserved.</span>
      </div>

      <VisitOurStore />
    </div>
  );
};

export default FooterDetails;
