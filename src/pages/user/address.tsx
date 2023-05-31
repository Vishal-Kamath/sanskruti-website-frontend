import UserLayout from "@/components/layouts/userLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useState } from "react";
import { Addresses, NewAdressPage } from "@/components/user/addressComponents";

const AddressContainer: NextPageWithLayout = () => {
  const [showNewAdress, setShowNewAddress] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const openNewAddressPage = (title: string, address: string) => {
    setNewAddress(address);
    setNewTitle(title);
    setShowNewAddress(true);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md border-2 border-gray-300">
      <div className="border-b-2 border-gray-300 bg-gray-200 p-3 text-lg font-medium">
        Addresses
      </div>
      <div className="px-3 py-5">
        {!showNewAdress ? (
          <Addresses setState={setShowNewAddress} />
        ) : (
          <NewAdressPage
            setShowNewAddress={setShowNewAddress}
            title={newTitle}
            address={newAddress}
          />
        )}
      </div>
    </div>
  );
};

export default AddressContainer;

AddressContainer.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
