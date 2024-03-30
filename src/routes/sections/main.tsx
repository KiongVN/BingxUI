import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
// components
import { SplashScreen } from 'src/components/loading-screen';

const DetailView = lazy(() => import('src/pages/details'));

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [{ path: ':id', element: <DetailView /> }],
  },
];
