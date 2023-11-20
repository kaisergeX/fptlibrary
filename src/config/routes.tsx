/* eslint-disable react-refresh/only-export-components */
import {lazy} from 'react';
import {Navigate, type RouteObject} from 'react-router-dom';
import {Path} from './path';
import PrivateOutlet from '~/layout/outlet/PrivateOutlet';

const ClientOutlet = lazy(() => import('~/layout/outlet/ClientOutlet'));
const AuthOutlet = lazy(() => import('~/layout/outlet/AuthOutlet'));
// const PrivateOutlet = lazy(() => import('~/layout/outlet/PrivateOutlet'));
const Homepage = lazy(() => import('~/pages/homepage'));
const LoginPage = lazy(() => import('~/pages/auth/login'));
const SignUpPage = lazy(() => import('~/pages/auth/signup'));

const PersonalPage = lazy(() => import('~/pages/personal'));

// Book pages
const BookBrowsing = lazy(() => import('~/pages/book/browsing'));
const BookDetail = lazy(() => import('~/pages/book/book-detail'));

// CMS pages
const CMSOutlet = lazy(() => import('~/layout/outlet/CMSOutlet'));
const CMSDashboard = lazy(() => import('~/pages/admin/dashboard'));
const CMSBookManagement = lazy(() => import('~/pages/admin/books'));
const CMSBookMutation = lazy(() => import('~/pages/admin/books/mutation'));
const CMSBookDetail = lazy(() => import('~/pages/admin/books/detail'));

// Common pages
const HiddenFeatures = lazy(() => import('~/pages/not-easter-egg'));
const PermissionDenied = lazy(() => import('~/pages/error-page/permission-denied'));
const NotFound = lazy(() => import('~/pages/error-page/not-found'));

const routesConfig: RouteObject[] = [
  {path: Path.HOMEPAGE, element: <Homepage />},
  {
    path: Path.AUTH,
    element: <AuthOutlet />,
    children: [
      {index: true, element: <Navigate to={Path.LOGIN} replace />},
      {path: Path.LOGIN, element: <LoginPage />},
      {path: Path.SIGNUP, element: <SignUpPage />},
    ],
  },
  {
    path: Path.CMS,
    element: <CMSOutlet />,
    children: [
      {index: true, element: <Navigate to={Path.CMS_DASHBOARD} replace />},
      {path: Path.CMS_DASHBOARD, element: <CMSDashboard />},
      {
        path: Path.CMS_BOOK,
        children: [
          {index: true, element: <CMSBookManagement />},
          {path: Path.CMS_BOOK_MUTATION, element: <CMSBookMutation />},
          {path: Path.CMS_BOOK_DETAIL, element: <CMSBookDetail />},
        ],
      },
    ],
  },

  {
    path: Path.LIBRARY,
    element: <ClientOutlet />,
    children: [
      {index: true, element: <Navigate to={Path.BOOK_BROWSING} replace />},
      {path: Path.BOOK_BROWSING, element: <BookBrowsing />},
      {path: Path.BOOK_DETAIL, element: <BookDetail />},
    ],
  },

  {
    path: Path.PERSONAL,
    element: <PrivateOutlet />,
    children: [{index: true, element: <PersonalPage />}],
  },

  {path: Path.HIDDEN_FEATURES, element: <HiddenFeatures />},
  {path: Path.PERMISSION_DENIED, element: <PermissionDenied />},
  {path: Path.UNDEFINED, element: <NotFound />},
];

export default routesConfig;
