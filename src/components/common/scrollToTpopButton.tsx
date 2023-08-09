"use client";

import { cn } from "@/utils/lib";
import { FC, useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTheTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={cn(
        "fixed bottom-7 right-[2vw] z-10 rounded-full border-[1px] border-gray-300 bg-white p-3 shadow-md transition-all duration-500 ease-in-out",
        !isVisible && "-z-50 cursor-default opacity-0"
      )}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTheTopButton;
