import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  makeApiRequest,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  handlePending,
  handleFulfilled,
  handleRejected,
} from '../api';
import { ICategoriesInitialState, ICategory, IRequestCheckbox } from '@/types/categories';
import { IRequestCategory } from '@/widgets/Modals/ModalCategories/types';

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
  string | undefined,
  { rejectValue: Error }
>('categories/getCategories', async (id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('get', `category/?store_id=${id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const addCategory = createAsyncThunk<string, IRequestCategory, { rejectValue: Error }>(
  'categories/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('post', `category/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editCategory = createAsyncThunk<string, IRequestCategory, { rejectValue: Error }>(
  'categories/editCategory',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `category/?category_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const deleteCategoryFlag = createAsyncThunk<string, string | number, { rejectValue: Error }>(
  'categories/deleteCategoryFlag',
  async (id, { rejectWithValue }) => {
    try {
      return await makeApiRequest('patch', `category/delete/?category_id=${id}`);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const toggleCheckboxCategory = createAsyncThunk<
  string,
  IRequestCheckbox,
  { rejectValue: Error }
>('categories/toggleCheckboxCategory', async (data, { rejectWithValue }) => {
  try {
    return await makeApiRequest(
      'patch',
      `category/checkbox/?category_id=${data.id}&checkbox=${data.code}`
    );
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export const { saveCategory } = categories.actions;

export { categories };
