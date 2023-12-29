import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {GlobalHistory} from './util/global-history.ts';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID, queryClient} from './config/system.ts';

import 'dayjs/locale/vi';
import './config/i18n';
import App from './App.tsx';

import './index.css';
import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'react-medium-image-zoom/dist/styles.css';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

// sync query state and data accross browser tabs
// https://tanstack.com/query/latest/docs/react/plugins/broadcastQueryClient
// broadcastQueryClient({
//   queryClient,
//   broadcastChannel: SERVICE_NAME,
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{v7_startTransition: true}}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GlobalHistory />

          <QueryClientProvider client={queryClient}>
            <App />

            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
