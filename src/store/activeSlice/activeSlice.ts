import { createSlice } from '@reduxjs/toolkit';

import { IActive } from '@/types/active';

export const LANGUAGE = {
  RUSSIAN: 'rus',
  ENGLAND: 'eng',
};

const initialState: IActive = {
  active: '/settings',
  theme: JSON.parse(localStorage.getItem('theme') || 'false'),
  render: false,
  recipient: 'all',
  language: LANGUAGE.RUSSIAN,
};

const active = createSlice({
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
    toggleLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { toggleTabs, toggleTheme, triggerRender, toggleRecipient, toggleLanguage } =
  active.actions;

export { active };
