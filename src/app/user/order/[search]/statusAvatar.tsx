import { cn } from "@/utils/lib";
import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";
import { LuPackage, LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { TbPackageExport, TbPackageImport } from "react-icons/tb";
import { HiCurrencyRupee, HiOutlineCurrencyRupee } from "react-icons/hi";

const avatarVariants = cva(
  "flex aspect-square h-full items-center justify-center rounded-full p-2",
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
  | "Refund credited";

const getIcon = (status: Status) => {
  if (status === "Pending") return LuPackageOpen;
  if (status === "Confirmed") return LuPackage;
  if (status === "Out for delivery") return TbPackageExport;
  if (status === "Delivered") return LuPackageCheck;
  if (status === "Out for pickup") return TbPackageImport;
  if (status === "Refund initiated") return HiOutlineCurrencyRupee;
  if (status === "Refund credited") return HiCurrencyRupee;
  return LuPackage;
};

interface Props extends VariantProps<typeof avatarVariants> {
  status: Status;
}
const StatusAvatar: FC<Props> = ({ status }) => {
  const AvatarIcon = getIcon(status);
  return (
    <div className={cn(avatarVariants({ status }))}>
      <AvatarIcon className="h-full w-full" />
    </div>
  );
};

export default StatusAvatar;
