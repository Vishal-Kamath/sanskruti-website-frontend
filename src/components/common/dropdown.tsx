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
    <div className="flex flex-col">
      <button
        className="flex items-center justify-between px-4 py-2 font-bold outline-none"
        onClick={() => setCardOpen((openState) => !openState)}
      >
        <span>{main}</span>
        <span className="text-xl">
          {cardOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </span>
      </button>
      <div
        className={`custom_scrollbar flex max-h-[15rem] flex-col gap-1 overflow-y-auto overflow-x-hidden bg-gray-50 py-1 ${classname} px-4 ${
          !cardOpen && "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownComponent;
