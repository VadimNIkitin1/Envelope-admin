import { createSlice } from '@reduxjs/toolkit';
import { IActive } from '../types/active';

const initialState: IActive = {
  active: '/shops',
  theme: JSON.parse(localStorage.getItem('theme') || 'false'),
  render: false,
  sidebar: false,
  recipient: 'all',
};

const slice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    toggleTabs(state, action) {
      state.active = action.payload;
    },
    toggleTheme(state) {
      state.theme = !state.theme;
      localStorage.setItem('theme', String(state.theme));
    },
    triggerRender(state) {
      state.render = !state.render;
    },
    toggleRecipient(state, action) {
      state.recipient = action.payload;
    },
  },
});

export const { toggleTabs, toggleTheme, triggerRender, toggleRecipient } = slice.actions;

export default slice.reducer;
