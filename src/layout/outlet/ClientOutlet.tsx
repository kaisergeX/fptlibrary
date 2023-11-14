import {LoadingOverlay} from '@mantine/core';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '~/layout/navbar';
import ScrollTopButton from '~/components/scroll-top-button';
import Footer from '../footer';

const ClientOutlet = () => {
  return (
    <>
      <main className="relative flex min-h-full flex-col">
        <Navbar />

        <div className="flex-1 pb-4 sm:pb-16 2xl:pb-[10vw]">
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
        </div>

        <ScrollTopButton className="z-10" />
        <Footer className="justify-self-end" />
      </main>
    </>
  );
};

export default ClientOutlet;
