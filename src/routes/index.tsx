// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '@/components/layout/database/Loading.tsx';
import PageLayoutWrapper from '@/components/layout/PageLayout/PageLayoutWrapper';

const Home = lazy(() => import('@/views/Home'));
const Login = lazy(() => import('@/views/Login'));
const Panel = lazy(() => import('@/views/Panel'));
const Cardapio = lazy(() => import('@/views/Cardapio'));
const SettingsColors = lazy(() => import('@/views/SettingsColors'));
const Teste = lazy(() => import('@/views/Teste'));
const Teste2 = lazy(() => import('@/views/Teste2'));
const PedidoFinalizado = lazy(() => import('@/views/OrderEnd'));

const router = createBrowserRouter([
  {
    element: <PageLayoutWrapper />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cardapio',
        element: <Cardapio />,
        handle: {
          viewportLimitConfig: { desktop: "company", mobile: 'auto' },
          isCenterItemH: true,
          isCenterItemV: true
        }
      },
      {
        path: '/cardapio/:id',
        element: <Cardapio />,
        handle: {
          viewportLimitConfig: { desktop: "company", mobile: 'auto' },
          isCenterItemH: true,
          isCenterItemV: true
        }
      },
      {
        path: '/settingscolors',
        element: <SettingsColors />,
        handle: {
          hideAlertColor: true,
          isCenterItemH: true,
          isCenterItemV: true
        }
      },
      {
        path: '/panel',
        element: <Panel />
      },
      {
        path: '/login',
        element: <Login />,
        handle: {
          viewportLimitConfig: { desktop: "complete", mobile: 'company' },
          isCenterItemH: true,
          isCenterItemV: true
        }
      },
      {
        path: '/pedido_finalizado',
        element: <PedidoFinalizado />,
        
      },
      {
        path: '/teste',
        element: <Teste />
      }
    ]
  },
  {
    path: '/teste2',
    element: <Teste2 />
  }
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

