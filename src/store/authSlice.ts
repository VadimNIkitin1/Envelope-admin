import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../types/auth';
import axios from 'axios';
import { IError } from '../types/categories';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

const initialState: IAuth = {
  isAuth: localStorage.getItem('token') ? true : false,
  company_id: '',
  loading: false,
  error: null,
};

interface IResponse {
  status_code: number;
  username: string;
  schema_name: string;
}

interface IAuthRequest {
  username: string;
  hashed_password: string;
}

export const authorization = createAsyncThunk<IResponse, IAuthRequest, { rejectValue: string }>(
  'auth/authorization',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('user/register/', data);
      localStorage.setItem('token', res.data.schema_name);
      console.log(res.data);
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
        state.company_id = action.payload.schema_name;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<IError>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleAuth } = slice.actions;

export default slice.reducer;
