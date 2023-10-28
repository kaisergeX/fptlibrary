import React from 'react';
import ReactDOM from 'react-dom/client';
import {MantineProvider} from '@mantine/core';
import {HelmetProvider} from 'react-helmet-async';

import App from './App.tsx';
import './config/i18n';

import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
