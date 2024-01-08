import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import type { INotification } from '@/pages/NotificationPage/NotificationPage';
import type { IinitialStateMail } from '@/types/mail';
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

const initialState: IinitialStateMail = {
  photo_url: '',
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<undefined, INotification, { rejectValue: string }>(
  'mail/sendMessage',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const store_id = localStorage.getItem('store_id') || '';
      const res = await instanceAxios.post(`mail/send_message/?store_id=${store_id}`, data);
      dispatch(clearImageMail());
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

export const sendMessageMyself = createAsyncThunk<
  undefined,
  INotification,
  { rejectValue: string }
>('mail/sendMessageMyself', async (data, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.post(`mail/send_message_me/`, data);

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

export const uploadPhotoForMail = createAsyncThunk<string, IRequestPhoto, { rejectValue: string }>(
  'mail/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post(
        `mail/upload_photo/?store_id=${data.store_id}`,
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

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    clearImageMail(state) {
      state.photo_url = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhotoForMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPhotoForMail.fulfilled, (state, action) => {
        state.photo_url = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearImageMail } = slice.actions;

export default slice.reducer;
