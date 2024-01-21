import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getProductsState = (state: RootState) => state.products;

const getProducts = createSelector([getProductsState], ({ products }) => products);
const getOneProduct = createSelector([getProductsState], ({ product }) => product);
const getUnits = createSelector([getProductsState], ({ units }) => units);

export const getAllProductsProperties = createStructuredSelector({
  products: getProducts,
  product: getOneProduct,
  units: getUnits,
});
