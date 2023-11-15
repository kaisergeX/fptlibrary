import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {GlobalHistory} from './util/global-history.ts';
import {DEFAULT_STALE_TIME} from './constants/service.ts';

import 'dayjs/locale/vi';
import './config/i18n';
import App from './App.tsx';

import './index.css';
import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {retry: false, staleTime: DEFAULT_STALE_TIME},
    mutations: {retry: false},
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <GlobalHistory />

        <QueryClientProvider client={queryClient}>
          <App />

          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
