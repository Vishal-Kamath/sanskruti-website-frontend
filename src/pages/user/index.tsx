import { useAppSelector } from '@/store/hooks';
import { NextPageWithLayout } from '../_app';
import { selectUser } from '@/slice/user.slice';
import { useRouter } from 'next/router';

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  return (
    <div className="px-[5vw] pb-10 pt-24 max-md:pt-36">
      <h2 className="mb-4 border-b-2 border-gray-300 pb-4 text-xl font-semibold">
        My Account
      </h2>

      {/* Account Details */}
      <div className="border-2 border-gray-300">
        <div className="border-b-2 border-gray-300 pb-4 text-xl font-semibold">
          Profile Details
        </div>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Address: {user.address}</div>
        <div>Mobile No: {user.mobileNo}</div>
      </div>
    </div>
  );
};

export default UserPage;
