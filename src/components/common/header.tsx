import { FC } from "react";

const UIHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="relative isolate flex justify-center">
      <div className="relative bg-white px-5 font-serif text-lg font-semibold md:text-2xl">
        <span>{title}</span>

        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-slate-500 bg-white"></div>
        <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full border-[1px] border-slate-500 bg-white"></div>
      </div>
      <div className="absolute top-1/2 -z-10 mx-auto h-[0.5px] w-full max-w-xl -translate-y-1/2 border-none bg-slate-500 outline-none"></div>
    </div>
  );
};

export default UIHeader;
