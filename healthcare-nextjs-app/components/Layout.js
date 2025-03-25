import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Healthcare Readmission Analytics` : 'Healthcare Readmission Analytics'}</title>
        <meta name="description" content={description || 'Reducing readmission rates through advanced analytics and machine learning'} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      
      <Navbar />
      
      <main>{children}</main>
      
      <Footer />
    </>
  );
}
