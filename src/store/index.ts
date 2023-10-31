import { configureStore } from '@reduxjs/toolkit';
import activeReducer from './activeSlice';
import tableHeaderReducer from './tableHeaderSlice';
import authReducer from './authSlice';
import categoriesReducer from './categorySlice';
import productsReducer from './productSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
  reducer: {
    active: activeReducer,
    modals: modalsReducer,
    tableHeader: tableHeaderReducer,
    categories: categoriesReducer,
    products: productsReducer,
    auth: authReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
