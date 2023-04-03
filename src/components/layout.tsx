import React from 'react';
import Head from 'next/head';
import Header from './header/header';
import { useAppSelector } from '@/store/hooks';
import { selectNotification } from '@/slice/notification.slice';
import Notification from './notification';

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const notification = useAppSelector(selectNotification);
  return (
    <>
      <Head>
        <title>Sanskruti</title>
        <meta
          name="description"
          content="Sanskruti, a one stop destination for latest fashion and clothing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-white text-black">
        {notification.notify && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
