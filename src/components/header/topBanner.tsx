import { FiPhoneCall } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

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
      className="flex w-full bg-slate-100 text-black"
    >
      <SwiperSlide>
        <a
          href="tel:911234567890"
          className="flex h-8 items-center justify-center gap-2 text-sm"
        >
          <FiPhoneCall />
          <span>+91-1234567890</span>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href="/shipping"
          className="flex h-8 items-center justify-center gap-2 text-sm"
        >
          <Image
            src="/assets/truck.svg"
            alt="Shipping truck"
            width={20}
            height={20}
            className="h-fit w-fit"
          />
          <span>Free Shipping in India</span>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href="/store"
          className="flex h-8 items-center justify-center gap-2 text-sm"
        >
          <MdLocationOn className="text-lg" />
          <span>Visit Our Store</span>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default TopBanner;
