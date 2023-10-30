import {Suspense} from 'react';
import {LoadingOverlay, MantineProvider, createTheme} from '@mantine/core';
import {DatesProvider} from '@mantine/dates';
import {Notifications} from '@mantine/notifications';
import {useTranslation} from 'react-i18next';
import {Head} from './layout/outlet/Head';
import {useRoutes} from 'react-router-dom';
import routesConfig from './config/routes';
import {defaultLanguage} from './config/system';
import {usePersistStore} from './store';

function App() {
  const {i18n} = useTranslation();
  const routers = useRoutes(routesConfig);
  const appTheme = usePersistStore((state) => state.theme);

  return (
    <MantineProvider theme={createTheme({primaryColor: appTheme})} defaultColorScheme="auto">
      <Head />
      <Notifications />

      <DatesProvider settings={{locale: i18n.resolvedLanguage || defaultLanguage}}>
        <Suspense
          fallback={
            <LoadingOverlay
              overlayProps={{opacity: 0.3}}
              transitionProps={{duration: 500}}
              visible
            />
          }
        >
          {routers}
        </Suspense>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
