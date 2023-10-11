"use client";

import { cn } from "@/utils/lib";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

const FloatingActionButtons: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  const handleScroll = () => {
    const halfScreenHeight = window.innerHeight / 2;
    const scrollY = window.scrollY;

    if (scrollY > halfScreenHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (isVisible) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const getWhatsApp = async () => {
      axios
        .get<{ number: number }>(
          `${process.env.ENDPOINT}/api/v1/superadmin/config/whatsappNumber`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setphoneNumber(res.data.number?.toString() || "");
        })
        .catch();
    };
    getWhatsApp();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-7 right-[2vw] isolate z-10 flex flex-col items-center justify-center gap-3">
      <button
        className={cn(
          "rounded-full border-[1px] border-gray-300 bg-white p-3 shadow-md transition-all duration-500 ease-in-out",
          !isVisible && "-z-50 cursor-default opacity-0"
        )}
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp className="h-5 w-5" />
      </button>
      {phoneNumber && (
        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-[1px] border-gray-300 bg-white p-3 shadow-md"
        >
          <BsWhatsapp
            title="Contact us on whatsapp"
            className="h-7 w-7 fill-whatsapp"
          />
        </a>
      )}
    </div>
  );
};

export default FloatingActionButtons;
