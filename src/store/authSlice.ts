import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../types/auth';

const initialState: IAuth = {
  auth: true,
  company_id: 1,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { toggleAuth } = slice.actions;

export default slice.reducer;
