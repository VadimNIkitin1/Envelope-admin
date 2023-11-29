import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IReportInitialState, ICustomers, IReportItemForCategory } from '../types/report';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

const initialState: IReportInitialState = {
  customers: [],
  totalSales: 0,
  totalSalesForCategory: [],
  totalSalesForProduct: [],
  loading: false,
  error: null,
};

export const getTotalSales = createAsyncThunk<
  number,
  string | number | null,
  { rejectValue: string }
>('report/getTotalSales', async (store_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`report/total_report/?store_id=${store_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getCustomers = createAsyncThunk<
  ICustomers[],
  string | number,
  { rejectValue: string }
>('report/getCustomers', async (store_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`report/customer/?store_id=${store_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getTotalSalesForCategory = createAsyncThunk<
  IReportItemForCategory[],
  string | number | null,
  { rejectValue: string }
>('report/getTotalSalesForCategory', async (store_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`report/total_category/?store_id=${store_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getTotalSalesForProduct = createAsyncThunk<
  IReportItemForCategory[],
  string | number | null,
  { rejectValue: string }
>('report/getTotalSalesForProduct', async (store_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`report/total_product/?store_id=${store_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
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
