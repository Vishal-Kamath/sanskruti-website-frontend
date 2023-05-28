import React, { useState } from 'react';

export const Input: React.FC<{
  input_type: string;
  placeholder: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}> = ({ input_type, placeholder, value, setValue }) => {
  return (
    <div className="relative h-10 w-full">
      <input
        type={input_type}
        className="peer h-full w-full rounded-md border-2 border-gray-400 bg-transparent px-3 outline-none outline-offset-0 focus:border-black hover:outline hover:outline-4 hover:outline-gray-300"
        id={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label
        htmlFor={placeholder}
        className={`absolute left-3 ${
          !!value ? 'top-0 text-sm' : 'top-1/2 text-lg'
        } -translate-y-1/2 bg-white px-2 text-lg transition-all delay-300 ease-in-out peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export const TextArea: React.FC<{
  placeholder: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}> = ({ placeholder, value, setValue }) => {
  return (
    <div className="relative h-10 w-full">
      <textarea
        className="peer h-full max-h-40 min-h-[2.5rem] w-full rounded-md border-2 border-gray-400 bg-transparent px-3 pt-[0.3rem] outline-none outline-offset-0 focus:border-black hover:outline hover:outline-4 hover:outline-gray-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label
        htmlFor={placeholder}
        className={`absolute left-3 ${
          !!value ? 'top-0 text-sm text-black' : 'top-5 text-lg'
        } -translate-y-1/2 bg-white px-2 text-lg transition-all delay-300 ease-in-out peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
      >
        {placeholder}
      </label>
    </div>
  );
};
