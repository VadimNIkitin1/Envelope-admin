import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IProduct, IProductsInitialState, IRequestPhoto, IUnit } from '@/types/products';
import type { IRequestProduct } from '@/widgets/Modals/ModalProducts/types';

import {
  handleFulfilled,
  handlePending,
  handleRejected,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  makeApiRequest,
} from './api';

const initialState: IProductsInitialState = {
  products: [],
  product: {
    id: 0,
    category_id: 0,
    category_name: 'string',
    name: 'string',
    price: 0,
    description: '',
    image: '',
    wt: 0,
    kilocalories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    unit_id: 0,
    availability: false,
    popular: false,
    delivery: false,
    takeaway: false,
    dinein: false,
  },
  units: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<IProduct[], number | string, { rejectValue: Error }>(
  'products/getProducts',
  async (id, { rejectWithValue }) => {
    try {
      return await makeApiRequest('get', `product/?store_id=${id}`);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const addProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: Error }>(
  'products/addProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      dispatch(clearImageProduct());
      return await makeApiRequest('post', `product/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const deleteProductFlag = createAsyncThunk<
  IProduct,
  string | number,
  { rejectValue: Error }
>('products/deleteProductFlag', async (id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('patch', `product/delete/?product_id=${id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const editProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: Error }>(
  'products/editProduct',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `product/?product_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const toggleCheckboxProduct = createAsyncThunk<
  IProduct,
  IRequestProduct,
  { rejectValue: Error }
>('products/toggleCheckboxProduct', async (data, { rejectWithValue }) => {
  try {
    return await makeApiRequest(
      'patch',
      `product/checkbox/?product_id=${data.id}&checkbox=${data.code}`
    );
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const uploadPhoto = createAsyncThunk<string, IRequestPhoto, { rejectValue: Error }>(
  'products/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest(
        'post',
        `product/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const getUnits = createAsyncThunk<IUnit[], undefined, { rejectValue: Error }>(
  'products/getUnits',
  async (_, { rejectWithValue }) => {
    try {
      return await makeApiRequest('get', `unit/`);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    saveProduct(state, action) {
      state.product = action.payload;
    },
    clearImageProduct(state) {
      state.product.image = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export const { saveProduct, clearImageProduct } = slice.actions;

export default slice.reducer;
