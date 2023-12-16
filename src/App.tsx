import {Suspense} from 'react';
import {LoadingOverlay, MantineProvider, createTheme} from '@mantine/core';
import {DatesProvider} from '@mantine/dates';
import {Notifications} from '@mantine/notifications';
import {ModalsProvider} from '@mantine/modals';
import {useTranslation} from 'react-i18next';
import {Head} from './layout/outlet/Head';
import {useRoutes} from 'react-router-dom';
import routesConfig from './config/routes';
import {defaultLanguage} from './config/system';
import {usePersistStore} from './store';
import FetchErrorBoundary from './pages/error-page/fetch-error-boundary';

function App() {
  const {i18n} = useTranslation();
  const routers = useRoutes(routesConfig);
  const appTheme = usePersistStore((state) => state.theme);

  return (
    <MantineProvider theme={createTheme({primaryColor: appTheme})} defaultColorScheme="auto">
      <Head />
      <Notifications limit={5} />

      <DatesProvider settings={{locale: i18n.resolvedLanguage || defaultLanguage}}>
        <FetchErrorBoundary>
          <Suspense
            fallback={
              <LoadingOverlay
                overlayProps={{opacity: 0.3}}
                transitionProps={{duration: 500}}
                visible
              />
            }
          >
            <ModalsProvider
              modalProps={{
                overlayProps: {backgroundOpacity: 0.5, blur: 2},
                centered: true,
                xOffset: '1rem',
                yOffset: '1rem',
                radius: 'md',
              }}
            >
              {routers}
            </ModalsProvider>
          </Suspense>
        </FetchErrorBoundary>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
