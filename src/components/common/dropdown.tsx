"use client";

import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const DropdownComponent: React.FC<{
  main: string;
  children: React.ReactElement | React.ReactElement[];
  classname?: string;
  open?: boolean;
}> = ({ main, children, classname, open }) => {
  const [cardOpen, setCardOpen] = useState(!!open);

  return (
    <div className="flex flex-col border-b-2 border-gray-300">
      <button
        className="flex items-center justify-between py-2 font-bold outline-none"
        onClick={() => setCardOpen((openState) => !openState)}
      >
        <span>{main}</span>
        <span className="text-xl text-gray-500">
          {cardOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </span>
      </button>
      <div
        className={`custom_scrollbar flex flex-col gap-1 overflow-y-auto overflow-x-hidden pb-3 text-[16px] text-gray-600 ${classname} ${
          !cardOpen && "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownComponent;
