import { configureStore } from '@reduxjs/toolkit';
import activeReducer from './activeSlice';
import authReducer, { localStorageMiddleware } from './authSlice';
import categoriesReducer from './categorySlice';
import productsReducer from './productSlice';
import modalsReducer from './modalsSlice';
import storeReducer from './storeSlice';
import reportReducer from './reportSlice';
import mailReducer from './mailSlice';

const store = configureStore({
  reducer: {
    active: activeReducer,
    modals: modalsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    auth: authReducer,
    store: storeReducer,
    report: reportReducer,
    mail: mailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
export default store;

export interface ApiError {
  message: string;
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
