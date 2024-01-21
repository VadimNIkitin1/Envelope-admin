import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getCategoriesState = (state: RootState) => state.categories;

const getCategoriesSelector = createSelector([getCategoriesState], ({ categories }) => categories);

const getOneCategory = createSelector([getCategoriesState], ({ category }) => category);

export const getAllCategoriesProperties = createStructuredSelector({
  categories: getCategoriesSelector,
  category: getOneCategory,
});
