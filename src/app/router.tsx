import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import AuthPage from '../pages/AuthPage/AuthPage';
import Layout from '../widgets/Layout/Layout';
import PricesPage from '../pages/PricesPage/PricesPage';
import MenuPage from '../pages/ProductsPage/ProductsPage';
import ClientsPage from '../pages/ClientsPage/ClientsPage';
import { NotificationPage } from '../pages/NotificationPage/NotificationPage';
import AnalyticPage from '../pages/AnalyticPage/AnalyticPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import RequireAuth from '../features/HOC/RequireAuth';
import StoreCardsPage from '../pages/StoreCardsPage/StoreCardsPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import { AuthType } from '../store/authSlice';
import { ANALYTIC_PAGE } from './constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
        errorElement={<ErrorPage />}
      >
        <Route
          path="/:company_id"
          element={
            <RequireAuth>
              <h1 style={{ color: 'white' }}>Добро пожаловать в Envelope App</h1>
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/stores'}
          element={
            <RequireAuth>
              <StoreCardsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/analytic'}
          element={
            <RequireAuth>
              <AnalyticPage type={ANALYTIC_PAGE.USER} />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/tariffs'}
          element={
            <RequireAuth>
              <PricesPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/products'}
          element={
            <RequireAuth>
              <MenuPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/categories'}
          element={
            <RequireAuth>
              <CategoriesPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/clients'}
          element={
            <RequireAuth>
              <ClientsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/notification'}
          element={
            <RequireAuth>
              <NotificationPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/settings'}
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path={'/:company_id/:store_id/analytic'}
          element={
            <RequireAuth>
              <AnalyticPage type={ANALYTIC_PAGE.STORE} />
            </RequireAuth>
          }
          errorElement={<ErrorPage />}
        />
        <Route path={'*'} element={<NotFoundPage />} errorElement={<ErrorPage />} />
      </Route>
      <Route path={'/about'} element={<AboutPage />} errorElement={<ErrorPage />} />
      <Route
        path={'/auth'}
        element={<AuthPage type={AuthType.REGISTER} />}
        errorElement={<ErrorPage />}
      />
      <Route
        path={'/login'}
        element={<AuthPage type={AuthType.LOGIN} />}
        errorElement={<ErrorPage />}
      />
    </>
  )
);

export default router;
