import {LoadingOverlay} from '@mantine/core';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '~/layout/navbar';
import ScrollTopButton from '~/components/scroll-top-button';
import Footer from '../footer';

const ClientOutlet = () => {
  return (
    <>
      <main className="relative min-h-[100dvh] pb-4 2xl:pb-28">
        <Navbar />

        <Suspense
          fallback={
            <LoadingOverlay
              overlayProps={{opacity: 0.3}}
              transitionProps={{duration: 500}}
              visible
            />
          }
        >
          <Outlet />
        </Suspense>

        <ScrollTopButton className="z-10" />
      </main>

      <Footer />
    </>
  );
};

export default ClientOutlet;
