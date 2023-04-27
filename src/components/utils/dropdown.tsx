import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const DropdownComponent: React.FC<{
  main: string;
  children: React.ReactElement | React.ReactElement[];
  classname?: string;
}> = ({ main, children, classname }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className={`flex flex-col gap-1 py-2 ${classname} pr-4 font-bold`}>
        <h5 className="flex items-center justify-between">
          <span>{main}</span>
          <span className="text-xl">
            {open ? (
              <AiOutlineMinus onClick={() => setOpen(false)} />
            ) : (
              <AiOutlinePlus onClick={() => setOpen(true)} />
            )}
          </span>
        </h5>
      </div>
      <div
        className={`custom_scrollbar flex max-h-[15rem] flex-col gap-1 overflow-x-hidden overflow-y-scroll bg-gray-50 py-1 ${classname} pr-4 ${
          !open && 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownComponent;
