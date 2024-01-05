import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuth } from '@/types/auth';
import { IError } from '@/types/categories';

import { IAuthRequestRegistration } from '@/pages/AuthPage/AuthPage.types';

const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export enum AuthType {
  REGISTER = 'register',
  LOGIN = 'login',
}

const initialState: IAuth = {
  data: {
    username: '',
    user_id: 0,
  },
  loading: false,
  error: null,
};

interface IResponse {
  access_token: string;
  data: {
    username: string;
    user_id: number;
  };
}

export const registration = createAsyncThunk<
  IResponse,
  IAuthRequestRegistration,
  { rejectValue: string }
>('auth/registration', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('user/register/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('data', JSON.stringify(res.data));
    localStorage.setItem('company_id', res.data.data.user_id);
    localStorage.setItem('token', res.data.access_token);
    localStorage.setItem('username', res.data.data.username);
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'false');
    }
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const logIn = createAsyncThunk<IResponse, IAuthRequestRegistration, { rejectValue: string }>(
  'auth/logIn',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post('login/', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.setItem('data', JSON.stringify(res.data));
      localStorage.setItem('company_id', res.data.data.user_id);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('username', res.data.data.username);
      const theme = localStorage.getItem('theme');
      if (!theme) {
        localStorage.setItem('theme', 'false');
      }
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  localStorage.removeItem('data');
  localStorage.removeItem('company_id');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('store_id');
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state) => {
        // state.data = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state) => {
        // state.data = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<IError>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
