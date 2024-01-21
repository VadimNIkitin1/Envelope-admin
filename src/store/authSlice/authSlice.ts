import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Dispatch, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosError } from 'axios';

import { IAuth } from '@/types/auth';

import { IAuthRequestRegistration } from '@/pages/AuthPage/types';
import { AuthType } from '@/app/constants';

const axiosInstance = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
});

const configureAxiosInstance = (type: string) => {
  if (type === AuthType.LOGIN) {
    return (axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded');
  }

  if (type === AuthType.REGISTER) {
    return (axiosInstance.defaults.headers['Content-Type'] = 'application/json');
  }

  return;
};

export const localStorageMiddleware = () => (next: Dispatch) => (action: AnyAction) => {
  if (action.type === 'auth/performAuthentication/fulfilled') {
    const { payload } = action;
    localStorage.setItem('data', JSON.stringify(payload.data));
    localStorage.setItem('token', payload.access_token);
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'false');
    }
  } else if (action.type === 'auth/logOut/fulfilled') {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
  }

  return next(action);
};

const initialState: IAuth = {
  data: {
    username: '',
    user_id: 0,
  },
  loading: false,
  error: null,
};

interface ApiError {
  message: string;
}

export const performAuthentication = createAsyncThunk<
  undefined,
  { data: IAuthRequestRegistration; url: string; axiosInstance: AxiosInstance },
  { rejectValue: string }
>('auth/performAuthentication', async ({ data, url, axiosInstance }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(url, data);

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

export const registration = (data: IAuthRequestRegistration) => {
  configureAxiosInstance(AuthType.REGISTER);
  return performAuthentication({ data, url: 'user/register/', axiosInstance });
};

export const logIn = (data: IAuthRequestRegistration) => {
  configureAxiosInstance(AuthType.LOGIN);
  return performAuthentication({ data, url: 'login/', axiosInstance });
};

export const logOut = createAsyncThunk('auth/logOut', async () => {});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performAuthentication.pending, (state) => {
        state.loading = true;
      })
      .addCase(performAuthentication.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export { auth };
