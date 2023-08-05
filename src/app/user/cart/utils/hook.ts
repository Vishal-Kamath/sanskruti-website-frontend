import { Address } from "@/redux/slice/user.slice";
import { useEffect, useState } from "react";
import z from "zod";

const addressObject = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  tel: z.number(),
  email: z.string().email(),
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
