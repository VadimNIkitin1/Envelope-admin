import { configureStore } from '@reduxjs/toolkit';
import { active } from './activeSlice';
import { localStorageMiddleware, auth } from './authSlice/authSlice';
import { categories } from './categorySlice';
import { products } from './productSlice';
import { modals } from './modalsSlice';
import { stores } from './storeSlice';
import { report } from './reportSlice';
import { mail } from './mailSlice';

const store = configureStore({
  reducer: {
    active: active.reducer,
    modals: modals.reducer,
    categories: categories.reducer,
    products: products.reducer,
    auth: auth.reducer,
    store: stores.reducer,
    report: report.reducer,
    mail: mail.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
export default store;

export interface ApiError {
  message: string;
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
