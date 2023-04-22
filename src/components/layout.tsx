import Head from 'next/head';
import React from 'react';
import Header from './header/header';
import Notification from './notification';
import { useAppSelector } from '@/store/hooks';
import { selectNotification } from '@/slice/notification.slice';
import Footer from './footer/footer';

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
      <main className="relative flex min-h-screen flex-col bg-white text-black">
        {notification.notify && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
