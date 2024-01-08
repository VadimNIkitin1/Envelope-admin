import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { ICategoriesInitialState, ICategory, IRequestCheckbox } from '@/types/categories';
import { IRequestCategory } from '@/widgets/Modals/ModalCategories/types';
import { ApiError } from '.';

const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

const initialState: ICategoriesInitialState = {
  categories: [],
  category: {
    id: 0,
    name: '',
    availability: false,
  },
  loading: true,
  error: null,
};

export const getCategories = createAsyncThunk<
  ICategory[],
  number | string | undefined,
  { rejectValue: string }
>('categories/getCategories', async (id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`category/?store_id=${id}`);
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

export const addCategory = createAsyncThunk<ICategory, IRequestCategory, { rejectValue: string }>(
  'categories/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post(`category/?store_id=${data.id}`, data);
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

export const editCategory = createAsyncThunk<string, IRequestCategory, { rejectValue: string }>(
  'categories/editCategory',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`category/?category_id=${data.id}`, data);
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

export const deleteCategoryFlag = createAsyncThunk<
  string,
  string | number,
  { rejectValue: string }
>('categories/deleteCategoryFlag', async (id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(`category/delete/?category_id=${id}`);
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

export const toggleCheckboxCategory = createAsyncThunk<
  string,
  IRequestCheckbox,
  { rejectValue: string }
>('categories/toggleCheckboxCategory', async (data, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(
      `category/checkbox/?category_id=${data.id}&checkbox=${data.code}`
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

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategoryFlag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryFlag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleCheckboxCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCheckboxCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveCategory } = slice.actions;

export default slice.reducer;
