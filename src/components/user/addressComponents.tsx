import { FC, useState, Dispatch, SetStateAction } from "react";
import { AiFillEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import UIButton from "../common/button";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
}
export const Addresses: FC<Props> = ({ setState }) => {
  const adresses: Address[] = [
    {
      title: "Home",
      address:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam esse pariatur nesciunt vel, blanditiis sint minima, asperiores quia eos doloremque perferendis quisquam et accusamus saepe reprehenderit, consectetur debitis assumenda? Adipisci!",
    },
    {
      title: "Office",
      address:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam esse pariatur nesciunt vel, blanditiis sint minima, asperiores quia eos doloremque perferendis quisquam et accusamus saepe reprehenderit, consectetur debitis assumenda? Adipisci!",
    },
  ];
  return (
    <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {adresses.map((address, index) => (
        <AddressComponent {...address} />
      ))}
      <button
        onClick={() => setState(true)}
        className="flex aspect-square flex-col items-center justify-center rounded border-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50"
      >
        <GrAdd /> <span>Add a new address</span>
      </button>
    </div>
  );
};

export type Address = {
  title: string;
  address: string;
};
export const AddressComponent: FC<Address> = ({ title, address }) => {
  return (
    <div className="flex aspect-square flex-col rounded border-2 border-gray-200 p-3 hover:border-gray-300">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="text-sm text-gray-500">{address}</div>
      <button className="ml-auto mt-auto flex w-fit items-center gap-1 border-b-2 border-white text-amber-400 hover:border-amber-400">
        <span>Edit</span>
        <AiFillEdit />{" "}
      </button>
    </div>
  );
};

interface NewAdressPageProps extends Address {
  setShowNewAddress: Dispatch<SetStateAction<boolean>>;
}
export const NewAdressPage: FC<NewAdressPageProps> = ({
  title,
  address,
  setShowNewAddress,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const addresses = address.split("\n");
  const [address1, setAddress1] = useState(addresses[0] || "");
  const [address2, setAddress2] = useState(addresses[1] || "");
  const [address3, setAddress3] = useState(addresses[2] || "");
  return (
    <>
      <UIButton
        onClick={() => setShowNewAddress(false)}
        className="absolute left-5 top-5 flex h-9 gap-2 px-5 text-black"
      >
        <BiArrowBack />
        <span>Back</span>
      </UIButton>
      <form className="flex flex-col gap-5 p-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-lg font-normal">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border-b-2 border-gray-200 px-3 outline-none focus:border-sky-400"
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-lg font-normal">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="border-b-2 border-gray-200 px-3 outline-none focus:border-sky-400"
            placeholder="Location"
          />
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="border-b-2 border-gray-200 px-3 outline-none focus:border-sky-400"
            placeholder="State and Country"
          />
          <input
            type="text"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
            className="border-b-2 border-gray-200 px-3 outline-none focus:border-sky-400"
            placeholder="Pin code"
          />
        </div>
      </form>
    </>
  );
};
