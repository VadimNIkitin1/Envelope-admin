import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import AuthPage from '../pages/AuthPage/AuthPage';
import Layout from '../widgets/Layout/Layout';
import LoginPage from '../pages/LoginPage/LoginPage';
import PricesPage from '../pages/PricesPage/PricesPage';
import MenuPage from '../pages/MenuPage/MenuPage';
import ClientsPage from '../pages/ClientsPage/ClientsPage';
import NotificationPage from '../pages/NotificationPage/NotificationPage';
import AnalyticPage from '../pages/AnalyticPage/AnalyticPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import RequireAuth from '../features/HOC/RequireAuth';
import StoreCardsPage from '../pages/StoreCardsPage/StoreCardsPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/:company_id" element={<Layout />} errorElement={<ErrorPage />}>
        <Route
          path={'/:company_id/shops'}
          element={
            <RequireAuth>
              <StoreCardsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/menu'}
          element={
            <RequireAuth>
              <MenuPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/categories'}
          element={
            <RequireAuth>
              <CategoriesPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/clients'}
          element={
            <RequireAuth>
              <ClientsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/notification'}
          element={
            <RequireAuth>
              <NotificationPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/analytic'}
          element={
            <RequireAuth>
              <AnalyticPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/settings'}
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/prices'}
          element={
            <RequireAuth>
              <PricesPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route path={'*'} element={<NotFoundPage />} errorElement={<ErrorPage />} />
      </Route>
      <Route path={'/about'} element={<AboutPage />} errorElement={<ErrorPage />} />
      <Route path={'/auth'} element={<AuthPage />} errorElement={<ErrorPage />} />
      <Route path={'/login'} element={<LoginPage />} errorElement={<ErrorPage />} />
    </>
  )
);

export default router;
