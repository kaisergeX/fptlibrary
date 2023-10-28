import type {PropsWithChildren} from 'react';
import {Helmet} from 'react-helmet-async';
import {SERVICE_NAME} from '~/config/system';

export const Head = ({
  title,
  description,
  children,
}: PropsWithChildren<{title?: string; description?: string}>) => {
  const headTitle = title ? `${title} | ${SERVICE_NAME}` : `${SERVICE_NAME}`;
  const headDesc = description ?? `This is ${SERVICE_NAME}`;
  return (
    <Helmet>
      <title>{headTitle}</title>
      <meta name="description" content={headDesc} />
      <meta property="og:title" content={headTitle} />
      <meta property="og:description" content={headDesc} />
      {children}
    </Helmet>
  );
};
