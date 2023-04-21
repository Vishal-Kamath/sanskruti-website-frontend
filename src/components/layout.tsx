import Head from 'next/head';
import React from 'react';
import Header from './header/header';

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Sanskruti</title>
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
};

export default Layout;
