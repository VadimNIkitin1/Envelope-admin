import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { ICategoriesInitialState, ICategory, IError, IRequestCheckbox } from '../types/categories';
import { IRequestCategory } from '../widgets/Modal/types';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

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
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`category/?store_id=${id}`, {
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

export const addCategory = createAsyncThunk<ICategory, IRequestCategory, { rejectValue: string }>(
  'categories/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.post(`category/?store_id=${data.id}`, data, {
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

export const editCategory = createAsyncThunk<string, IRequestCategory, { rejectValue: string }>(
  'categories/editCategory',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.put(`category/?category_id=${data.id}`, data, {
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

export const deleteCategory = createAsyncThunk<string, string | number, { rejectValue: string }>(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.delete(`category/?category_id=${id}`, {
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

export const deleteCategoryFlag = createAsyncThunk<
  string,
  string | number,
  { rejectValue: string }
>('categories/deleteCategoryFlag', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.put(
      `category/delete/?category_id=${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const toggleCheckboxCategory = createAsyncThunk<
  string,
  IRequestCheckbox,
  { rejectValue: string }
>('categories/toggleCheckboxCategory', async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.put(
      `category/checkbox/?category_id=${data.id}&checkbox=${data.code}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
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
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
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
      .addMatcher(isError, (state, action: PayloadAction<IError>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveCategory } = slice.actions;

export default slice.reducer;
