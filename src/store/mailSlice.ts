import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import type { INotification } from '../pages/NotificationPage/NotificationPage';
import type { IinitialStateMail } from '../types/mail';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

interface IRequestPhoto {
  store_id: string | number;
  formData: FormData;
}

const initialState: IinitialStateMail = {
  photo_url: '',
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<undefined, INotification, { rejectValue: string }>(
  'mail/sendMessage',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const token = localStorage.getItem('token') || '';
      const store_id = localStorage.getItem('store_id') || '';
      const res = await axios.post(`mail/send_message/?store_id=${store_id}`, data, {
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
    clearImage(state) {
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

export const { clearImage } = slice.actions;

export default slice.reducer;
