import React, { useState } from 'react';

export const Input: React.FC<{
  symbol: React.ReactElement;
  input_type: string;
  placeholder: string;
}> = ({ symbol, input_type, placeholder }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex h-10 w-full overflow-hidden rounded-md">
      <span
        className={`grid w-10 place-content-center ${
          focus ? 'bg-red-200' : 'bg-pinkAccent'
        }`}
      >
        {symbol}
      </span>
      <input
        type={input_type}
        className={`h-full w-full rounded-r-md border-2 bg-transparent px-3 outline-none ${
          focus ? 'border-red-200' : 'border-pinkAccent'
        }`}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export const TextArea: React.FC<{
  symbol: React.ReactElement;
  placeholder: string;
}> = ({ symbol, placeholder }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex w-full overflow-hidden rounded-md">
      <span
        className={`grid h-full w-10 place-content-center ${
          focus ? 'bg-red-200' : 'bg-pinkAccent'
        }`}
      >
        {symbol}
      </span>
      <textarea
        className={`h-full max-h-40 min-h-[2.5rem] w-full rounded-r-md border-2 bg-transparent px-3 pt-[0.3rem] outline-none ${
          focus ? 'border-red-200' : 'border-pinkAccent'
        }`}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};
