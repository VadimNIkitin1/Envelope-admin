import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { INotification } from '@/pages/NotificationPage/NotificationPage';
import type { IRequestPhoto, IinitialStateMail } from '@/types/mail';

import {
  handleFulfilled,
  handlePending,
  handleRejected,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  makeApiRequest,
} from './api';

const initialState: IinitialStateMail = {
  photo_url: '',
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<undefined, INotification, { rejectValue: Error }>(
  'mail/sendMessage',
  async ({ store_id, ...data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(clearImageMail());
      return await makeApiRequest('post', `mail/send_message/?store_id=${store_id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const sendMessageMyself = createAsyncThunk<undefined, INotification, { rejectValue: Error }>(
  'mail/sendMessageMyself',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('post', `mail/send_message_me/`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const uploadPhotoForMail = createAsyncThunk<string, IRequestPhoto, { rejectValue: Error }>(
  'mail/uploadPhotoForMail',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest(
        'post',
        `mail/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

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
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export const { clearImageMail } = slice.actions;

export default slice.reducer;
