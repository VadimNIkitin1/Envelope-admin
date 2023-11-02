import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductsInitialState, IUnit } from '../types/products';
import type { IRequestProduct } from '../widgets/ModalProducts/types';

const initialState: IProductsInitialState = {
  products: [],
  product: {
    id: 0,
    category_id: 0,
    category_name: 'string',
    name_rus: 'string',
    price: 0,
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

export const getProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`product/`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: string }>(
  'products/addProduct',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`product/`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<IProduct, string | number, { rejectValue: string }>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`product/?product_id=${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: string }>(
  'products/editProduct',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`product/?product_id=${data.id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleCheckboxProduct = createAsyncThunk<
  IProduct,
  IRequestProduct,
  { rejectValue: string }
>('products/toggleCheckboxProduct', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.put(`product/${data.id}/checkbox/?checkbox=${data.code}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getUnits = createAsyncThunk<IUnit[], undefined, { rejectValue: string }>(
  'products/fetchUnits',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`product/unit/all/`);
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
  name: 'products',
  initialState,
  reducers: {
    saveProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleCheckboxProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCheckboxProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.units = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveProduct } = slice.actions;

export default slice.reducer;
