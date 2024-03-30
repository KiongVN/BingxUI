import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CopyTradingPage from 'src/pages/copy-trading/home';
import MainLayout from 'src/layouts/main';
import { mainRoutes } from './main';
import { authRoutes } from './auth';

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <CopyTradingPage />
        </MainLayout>
      ),
    },
    {
      path: '/copy-trading',
      element: (
        <MainLayout>
          <CopyTradingPage />
        </MainLayout>
      ),
    },

    // Auth routes
    ...authRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
