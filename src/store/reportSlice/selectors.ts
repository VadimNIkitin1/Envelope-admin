import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getReportState = (state: RootState) => state.report;

const getCustomersSelector = createSelector([getReportState], ({ customers }) => customers);

const getTotalSalesSelector = createSelector([getReportState], ({ totalSales }) => totalSales);

const getTotalSalesForCategorySelector = createSelector(
  [getReportState],
  ({ totalSalesForCategory }) => totalSalesForCategory
);

const getTotalSalesForProductSelector = createSelector(
  [getReportState],
  ({ totalSalesForProduct }) => totalSalesForProduct
);

export const getAllReportProperties = createStructuredSelector({
  customers: getCustomersSelector,
  totalSales: getTotalSalesSelector,
  totalSalesForCategory: getTotalSalesForCategorySelector,
  totalSalesForProduct: getTotalSalesForProductSelector,
});
