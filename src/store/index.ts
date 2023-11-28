import { configureStore } from '@reduxjs/toolkit';
import activeReducer from './activeSlice';
import authReducer from './authSlice';
import categoriesReducer from './categorySlice';
import productsReducer from './productSlice';
import modalsReducer from './modalsSlice';
import storeReducer from './storeSlice';
import reportReducer from './reportSlice';

const store = configureStore({
  reducer: {
    active: activeReducer,
    modals: modalsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    auth: authReducer,
    store: storeReducer,
    report: reportReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
