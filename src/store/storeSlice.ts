import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IStore, IStoreInitialState } from '../types/stores';
import { IRequestStores } from '../widgets/ModalStores/types';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

const initialState: IStoreInitialState = {
  stores: [],
  store_id: 0,
  loading: false,
  error: null,
};

export const getStores = createAsyncThunk<IStore[], undefined, { rejectValue: string }>(
  'store/getStores',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.get('store/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStore = createAsyncThunk<IStore, IRequestStores, { rejectValue: string }>(
  'store/addStore',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.post('store/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
