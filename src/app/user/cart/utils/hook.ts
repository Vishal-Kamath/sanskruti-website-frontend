import { Address } from "@/redux/slice/user.slice";
import { useEffect, useState } from "react";
import z from "zod";

const addressObject = z.object({
  id: z.string(),
  fullName: z.string({ required_error: "fullName is not Defined" }),
  contactNo: z.number({ required_error: "fullName is not Defined" }),
  pincode: z.number({ required_error: "fullName is not Defined" }),
  nearBy: z.string({ required_error: "near by feild is empty" }),
  landmark: z.string({ required_error: "landmark is not defined" }),
  city: z.string({ required_error: "city is not Defined" }),
  state: z.string({ required_error: "state is not Defined" }),
});

export const useAddressState = (
  name: "billingAddress" | "shippingAddress"
): [Address | undefined, (address: Address) => void] => {
  const [addressState, setAddressState] = useState<Address>();

  const handleSetAddress = (address: Address) => {
    localStorage.setItem(name, JSON.stringify(address));
    setAddressState(address);
  };

  useEffect(() => {
    try {
      const storageState = localStorage.getItem(name);
      if (!storageState) return;
      const initialState = JSON.parse(storageState) as Address;
      addressObject.parse(initialState);
      setAddressState(initialState);
    } catch {
      localStorage.removeItem(name);
      return;
    }
  }, []);

  return [addressState, handleSetAddress];
};
