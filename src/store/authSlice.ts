import axios from 'axios';
import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../types/auth';
import { IError } from '../types/categories';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const initialState: IAuth = {
  isAuth: false,
  company_id: null,
  loading: false,
  error: null,
};

interface IResponse {
  access_token: string;
  user_id: number;
}

interface IAuthRequest {
  username: string;
  password: string;
}

export const authorization = createAsyncThunk<IResponse, IAuthRequest, { rejectValue: string }>(
  'auth/authorization',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('user/register/', data);
      localStorage.setItem('token', res.data.access_token);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk<IResponse, IAuthRequest, { rejectValue: string }>(
  'auth/logIn',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('login/', data);
      localStorage.setItem('token', res.data.access_token);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  localStorage.removeItem('token');
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.company_id = action.payload.user_id;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.company_id = action.payload.user_id;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<IError>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleAuth } = slice.actions;

export default slice.reducer;
