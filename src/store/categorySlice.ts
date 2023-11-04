import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { ICategoriesInitialState, ICategory, IError } from '../types/categories';
import { IRequestCategory } from '../widgets/ModalCategories/types';
import { useLocalStorage } from '../features/hooks/useLocalStorage';

const initialState: ICategoriesInitialState = {
  categories: [],
  category: {
    id: 0,
    name: '',
    availability: false,
  },
  loading: false,
  error: {
    detail: '',
  },
};

export const getCategories = createAsyncThunk<ICategory[], undefined, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const [token] = useLocalStorage('data', '');
      const res = await axios.get(`category/`, {
        headers: {
          Authorization: `Bearer ${token.acces_token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk<ICategory, IRequestCategory, { rejectValue: string }>(
  'categories/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      const [token] = useLocalStorage('data', '');
      const res = await axios.post(`category/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.acces_token}`,
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
      const [token] = useLocalStorage('data', '');
      const res = await axios.put(`category/?category_id=${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.acces_token}`,
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
      const [token] = useLocalStorage('data', '');
      const res = await axios.delete(`category/?category_id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.acces_token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleCheckboxCategory = createAsyncThunk<
  string,
  IRequestCategory,
  { rejectValue: string }
>('categories/toggleCheckboxCategory', async (data, { rejectWithValue }) => {
  try {
    const [token] = useLocalStorage('data', '');
    const res = await axios.patch(`category/${data.id}/checkbox/?checkbox=${data.code}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.acces_token}`,
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
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleCheckboxCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCheckboxCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<IError>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveCategory } = slice.actions;

export default slice.reducer;
