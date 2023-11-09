import { createSlice } from '@reduxjs/toolkit';
import { IActive } from '../types/active';

const initialState: IActive = {
  active: '/shops',
  theme: JSON.parse(localStorage.getItem('theme') || ''),
  render: false,
  sidebar: false,
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
    toggleSidebar(state, action) {
      state.sidebar = action.payload;
    },
  },
});

export const { toggleTabs, toggleTheme, triggerRender, toggleSidebar } = slice.actions;

export default slice.reducer;
