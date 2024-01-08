import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  IReportInitialState,
  ICustomers,
  IReportItemForCategory,
  ITotalSales,
} from '@/types/report';
import { ApiError } from '.';

const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

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
  string | number | null,
  { rejectValue: string }
>('report/getTotalSales', async (store_id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`report/total_report/?store_id=${store_id}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const getCustomers = createAsyncThunk<
  ICustomers[],
  string | number | undefined,
  { rejectValue: string }
>('report/getCustomers', async (store_id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`report/customer/?store_id=${store_id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const getTotalSalesForCategory = createAsyncThunk<
  IReportItemForCategory[],
  string | number | null,
  { rejectValue: string }
>('report/getTotalSalesForCategory', async (store_id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`report/total_category/?store_id=${store_id}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const getTotalSalesForProduct = createAsyncThunk<
  IReportItemForCategory[],
  string | number | null,
  { rejectValue: string }
>('report/getTotalSalesForProduct', async (store_id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`report/total_product/?store_id=${store_id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalSales.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSales = action.payload;
      })
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getTotalSalesForCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalSalesForCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSalesForCategory = action.payload;
      })
      .addCase(getTotalSalesForProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalSalesForProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSalesForProduct = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
