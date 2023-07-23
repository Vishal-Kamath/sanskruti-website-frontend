import { FC } from "react";

const UIHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="relative isolate flex justify-center">
      <h3 className="font-ysabeau bg-white px-5 text-2xl font-semibold">
        {title}
      </h3>
      <div className="absolute top-1/2 -z-10 h-[1px] w-full bg-slate-500"></div>
    </div>
  );
};

export default UIHeader;
