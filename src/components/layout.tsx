import Link from 'next/link';
import React from 'react';
import Logo from './header/logo';
import Head from 'next/head';
import Header from './header/header';

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
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
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
