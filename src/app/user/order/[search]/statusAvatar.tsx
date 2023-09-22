import { cn } from "@/utils/lib";
import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";
import {
  LuPackage,
  LuPackageCheck,
  LuPackageOpen,
  LuPackageX,
} from "react-icons/lu";
import { TbPackageExport, TbPackageImport, TbPackageOff } from "react-icons/tb";
import { HiCurrencyRupee, HiOutlineCurrencyRupee } from "react-icons/hi";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { BiTimeFive } from "react-icons/bi";

const avatarVariants = cva(
  "flex aspect-square h-10 w-10 items-center justify-center rounded-full p-2",
  {
    variants: {
      status: {
        "Pending": "bg-gray-200 text-gray-400",
        "Confirmed": "bg-blue-100 text-blue-400",
        "Out for delivery": "bg-amber-100 text-amber-400",
        "Delivered": "bg-emerald-100 text-emerald-400",
        "Out for pickup": "bg-amber-100 text-amber-400",
        "Refund initiated": "bg-blue-100 text-blue-400",
        "Refund credited": "bg-emerald-100 text-emerald-400",
        "Failure": "bg-red-100 text-red-500",
        "Aborted": "bg-yellow-100 text-yellow-500",
        "Invalid": "bg-teal-100 text-teal-500",
        "Timeout": "bg-blue-100 text-blue-500",
      },
    },
    defaultVariants: {
      status: "Pending",
    },
  }
);

type Status =
  | "Pending"
  | "Confirmed"
  | "Out for delivery"
  | "Delivered"
  | "Out for pickup"
  | "Refund initiated"
  | "Refund credited"
  | "Failure"
  | "Aborted"
  | "Invalid"
  | "Timeout";

const getIcon = (status: Status) => {
  if (status === "Pending") return LuPackageOpen;
  if (status === "Confirmed") return LuPackage;
  if (status === "Out for delivery") return TbPackageExport;
  if (status === "Delivered") return LuPackageCheck;
  if (status === "Out for pickup") return TbPackageImport;
  if (status === "Refund initiated") return HiOutlineCurrencyRupee;
  if (status === "Refund credited") return HiCurrencyRupee;
  if (status === "Failure") return LuPackageX;
  if (status === "Aborted") return TbPackageOff;
  if (status === "Invalid") return PiWarningCircleDuotone;
  if (status === "Timeout") return BiTimeFive;
  return LuPackage;
};

interface Props extends VariantProps<typeof avatarVariants> {
  status: Status;
}
const StatusAvatar: FC<Props> = ({ status }) => {
  const AvatarIcon = getIcon(status);
  return (
    <div className={cn(avatarVariants({ status }))}>
      <AvatarIcon className="h-8 w-8" />
    </div>
  );
};

export default StatusAvatar;
