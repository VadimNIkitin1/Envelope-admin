import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProduct, IProductsInitialState, IUnit } from '@/types/products';
import type { IRequestProduct } from '@/widgets/Modals/ModalProducts/types';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;
  return config;
});

interface IRequestPhoto {
  store_id: string | number | undefined;
  formData: FormData;
}

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

export const getProducts = createAsyncThunk<
  IProduct[],
  number | string | undefined,
  { rejectValue: string }
>('products/getProducts', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`product/?store_id=${id}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: string }>(
  'products/addProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`product/?store_id=${data.id}`, data);
      dispatch(clearImageProduct());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductFlag = createAsyncThunk<string, string | number, { rejectValue: string }>(
  'products/deleteProductFlag',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`product/delete/?product_id=${id}`);
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
    const res = await axios.patch(`product/checkbox/?product_id=${data.id}&checkbox=${data.code}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const uploadPhoto = createAsyncThunk<string, IRequestPhoto, { rejectValue: string }>(
  'products/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `product/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUnits = createAsyncThunk<IUnit[], undefined, { rejectValue: string }>(
  'products/getUnits',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`unit/`);
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
    clearImageProduct(state) {
      state.product.image = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleCheckboxProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCheckboxProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.units = action.payload;
        state.loading = false;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.product.image = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveProduct, clearImageProduct } = slice.actions;

export default slice.reducer;
