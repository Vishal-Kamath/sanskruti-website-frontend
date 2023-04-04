import { useAppSelector } from '@/store/hooks';
import { NextPageWithLayout } from '../_app';
import { selectLoginStatus } from '@/slice/user.slice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();

  const isLoggedIn = useAppSelector(selectLoginStatus);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/user/login');
    }
  }, [isLoggedIn, router]);

  return <div className="pt-20">User Page</div>;
};

export default UserPage;
