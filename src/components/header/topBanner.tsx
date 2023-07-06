import { FiPhoneCall } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const TopBanner: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      className="flex w-full bg-black text-white [&>*>*]:py-1"
    >
      <SwiperSlide>
        <div className="flex items-center justify-center gap-2 text-sm">
          <FiPhoneCall />
          <span>+91-1234567890</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Image
            src="/assets/truck.svg"
            alt="Shipping truck"
            width={20}
            height={20}
            className="h-fit w-fit"
          />
          <span>Free Shipping in India</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="#visitOurStore"
          className="flex items-center justify-center gap-2 text-sm"
        >
          <MdLocationOn className="text-lg" />
          <span>Visit Our Store</span>
        </a>
      </SwiperSlide>
    </Swiper>
  );
};

export default TopBanner;
