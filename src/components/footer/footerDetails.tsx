import React from 'react';
import FooterDetailsCard from './footerDetailsCard';

const FooterDetails: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-5 bg-gray-100 pb-10">
      <div className="flex w-full justify-between max-md:flex-col md:px-[5vw]">
        <FooterDetailsCard
          title="DESIGNER WEAR"
          list={[
            {
              inWebsiteLink: true,
              title: 'Salwar Kameez',
              link: '/category/Salwar Kameez',
            },
            {
              inWebsiteLink: true,
              title: 'Sarees',
              link: '/category/Sarees',
            },
            {
              inWebsiteLink: true,
              title: 'Lehengas',
              link: '/category/Lehengas',
            },
            {
              inWebsiteLink: true,
              title: 'Gowns',
              link: '/category/Gowns',
            },
            {
              inWebsiteLink: true,
              title: 'Kidswear',
              link: '/category/Kidswear',
            },
            {
              inWebsiteLink: true,
              title: 'Saree Blouse',
              link: '/category/Saree Blouse',
            },
            {
              inWebsiteLink: true,
              title: 'Indowestern Styles',
              link: '/category/Indowestern Styles',
            },
            {
              inWebsiteLink: true,
              title: 'Accessories',
              link: '/category/Accessories',
            },
          ]}
        />
        <FooterDetailsCard
          title="ABOUT US"
          list={[
            {
              inWebsiteLink: true,
              title: 'About Us',
              link: '/about',
            },
            {
              inWebsiteLink: true,
              title: 'Contact Us',
              link: '/contactUs',
            },
            {
              inWebsiteLink: false,
              title: 'Blog',
              link: '#',
            },
            {
              inWebsiteLink: true,
              title: 'testimonial',
              link: '/testimonial',
            },
          ]}
        />

        <FooterDetailsCard
          title="POLICIES"
          list={[
            {
              inWebsiteLink: true,
              title: 'Terms & Conditions',
              link: '/terms and conditions',
            },
            {
              inWebsiteLink: true,
              title: 'Shipping',
              link: '/shipping',
            },
            {
              inWebsiteLink: true,
              title: 'Return Policy',
              link: '/return policy',
            },
            {
              inWebsiteLink: true,
              title: "FAQ's",
              link: '/faqs',
            },
          ]}
        />
        <div className="flex flex-col gap-2">
          <FooterDetailsCard
            title="GET IN TOUCH"
            list={[
              {
                title: '+91-1234567890',
              },
              {
                title: '+91-0987654321',
              },
            ]}
          />
          <FooterDetailsCard
            title="EMAIL US ON"
            list={[
              {
                inWebsiteLink: false,
                title: 'info@sanskruti.com',
                link: 'mailto:info@sanskruti.com',
              },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 px-[5vw] max-md:flex-col">
        <span>Design and development by 🖤 Growtecs</span>
        <span>© 2020 - 2023 Sanskruti NX All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default FooterDetails;
