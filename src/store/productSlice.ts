import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { IProduct, IProductsInitialState, IUnit } from '@/types/products';
import type { IRequestProduct } from '@/widgets/Modals/ModalProducts/types';
import { ApiError } from '.';

const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
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
    const res = await instanceAxios.get(`product/?store_id=${id}`);
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

export const addProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: string }>(
  'products/addProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await instanceAxios.post(`product/?store_id=${data.id}`, data);
      dispatch(clearImageProduct());
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
  }
);

export const deleteProductFlag = createAsyncThunk<string, string | number, { rejectValue: string }>(
  'products/deleteProductFlag',
  async (id, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.patch(`product/delete/?product_id=${id}`);
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
  }
);

export const editProduct = createAsyncThunk<IProduct, IRequestProduct, { rejectValue: string }>(
  'products/editProduct',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`product/?product_id=${data.id}`, data);
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
  }
);

export const toggleCheckboxProduct = createAsyncThunk<
  IProduct,
  IRequestProduct,
  { rejectValue: string }
>('products/toggleCheckboxProduct', async (data, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(
      `product/checkbox/?product_id=${data.id}&checkbox=${data.code}`
    );
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

export const uploadPhoto = createAsyncThunk<string, IRequestPhoto, { rejectValue: string }>(
  'products/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post(
        `product/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
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
  }
);

export const getUnits = createAsyncThunk<IUnit[], undefined, { rejectValue: string }>(
  'products/getUnits',
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.get(`unit/`);
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
