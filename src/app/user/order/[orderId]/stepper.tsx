import { cn } from "@/utils/lib";
import { FC } from "react";
import { BsCheckLg } from "react-icons/bs";

const Stepper: FC<{ statuses: string[]; currentStep: number }> = ({
  currentStep,
  statuses,
}) => {
  return (
    <div className="mx-auto flex h-fit w-full max-w-3xl text-[10px]">
      {statuses.map((step, index) => (
        <div
          className="step-item relative flex w-full flex-col items-center justify-center gap-1"
          key={index}
        >
          {/* dash */}
          <div
            className={cn(
              "absolute right-1/2 top-[8px] -z-10 h-[1px] w-full",
              index === 0 && "hidden",
              index <= currentStep ? "bg-sky-500" : "bg-slate-300"
            )}
          ></div>

          {/* content */}
          <div
            className={cn(
              "grid h-4 w-4 place-content-center rounded-full bg-sky-100 font-bold",
              index <= currentStep && "bg-sky-500 text-white",
              index > currentStep && "bg-slate-300"
            )}
          >
            {index <= currentStep ? (
              <BsCheckLg className="h-2 w-2" />
            ) : (
              index + 1
            )}
          </div>
          <div className="text-gray-500">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
