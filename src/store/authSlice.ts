import axios from 'axios';
import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../types/auth';
import { IError } from '../types/categories';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

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

interface IAuthRequest {
  username: string;
  password: string;
}

export const authorization = createAsyncThunk<IResponse, IAuthRequest, { rejectValue: string }>(
  'auth/authorization',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('user/register/', data);
      localStorage.setItem('data', JSON.stringify(res.data));
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
      localStorage.setItem('data', JSON.stringify(res.data));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  localStorage.removeItem('data');
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
      .addCase(authorization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorization.fulfilled, (state) => {
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
