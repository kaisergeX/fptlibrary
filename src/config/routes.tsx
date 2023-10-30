/* eslint-disable react-refresh/only-export-components */
import {lazy} from 'react';
import {Navigate, type RouteObject} from 'react-router-dom';
import {Path} from './path';

const PrivateOutlet = lazy(() => import('~/layout/outlet/PrivateOutlet'));
const Homepage = lazy(() => import('~/pages/homepage'));
const LoginPage = lazy(() => import('~/pages/login'));

// CMS pages
const CMSOutlet = lazy(() => import('~/layout/outlet/CMSOutlet'));
const CMSDashboard = lazy(() => import('~/pages/admin/dashboard'));

// Common pages
const HiddenFeatures = lazy(() => import('~/pages/not-easter-egg'));
const NotFound = lazy(() => import('~/pages/not-found'));

const routesConfig: RouteObject[] = [
  {path: Path.HOMEPAGE, element: <Homepage />},
  {path: Path.LOGIN, element: <LoginPage />},
  {path: Path.RENT, element: <PrivateOutlet />},
  {
    path: Path.CMS,
    element: <CMSOutlet />,
    children: [
      {index: true, element: <Navigate to={Path.CMS_DASHBOARD} replace />},
      {path: Path.CMS_DASHBOARD, element: <CMSDashboard />},
    ],
  },
  {path: Path.HIDDEN_FEATURES, element: <HiddenFeatures />},
  {path: Path.UNDEFINED, element: <NotFound />},
];

export default routesConfig;
