import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import type { INotification } from '@/pages/NotificationPage/NotificationPage';
import type { IinitialStateMail } from '@/types/mail';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

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
      const token = localStorage.getItem('token') || '';
      const store_id = localStorage.getItem('store_id') || '';
      const res = await axios.post(`mail/send_message/?store_id=${store_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(clearImageMail());

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessageMyself = createAsyncThunk<
  undefined,
  INotification,
  { rejectValue: string }
>('mail/sendMessageMyself', async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.post(`mail/send_message_me/`, data, {
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

export const uploadPhotoForMail = createAsyncThunk<string, IRequestPhoto, { rejectValue: string }>(
  'mail/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.post(`mail/upload_photo/?store_id=${data.store_id}`, data.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
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
