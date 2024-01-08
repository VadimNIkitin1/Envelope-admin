import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IReportInitialState, ICustomers, IReportItemFor, ITotalSales } from '@/types/report';

import {
  handleFulfilled,
  handlePending,
  handleRejected,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  makeApiRequest,
} from './api';

const initialState: IReportInitialState = {
  customers: [],
  totalSales: {
    total_sales: 0,
  },
  totalSalesForCategory: [],
  totalSalesForProduct: [],
  loading: false,
  error: null,
};

export const getTotalSales = createAsyncThunk<
  ITotalSales,
  number | undefined,
  { rejectValue: Error }
>('report/getTotalSales', async (store_id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('get', `report/total_report/?store_id=${store_id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const getCustomers = createAsyncThunk<
  ICustomers[],
  number | undefined,
  { rejectValue: Error }
>('report/getCustomers', async (store_id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('get', `report/customer/?store_id=${store_id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const getTotalSalesForCategory = createAsyncThunk<
  IReportItemFor[],
  number | undefined,
  { rejectValue: Error }
>('report/getTotalSalesForCategory', async (store_id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('get', `report/total_category/?store_id=${store_id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const getTotalSalesForProduct = createAsyncThunk<
  IReportItemFor[],
  number | undefined,
  { rejectValue: Error }
>('report/getTotalSalesForProduct', async (store_id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('get', `report/total_product/?store_id=${store_id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

const slice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export default slice.reducer;
