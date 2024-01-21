import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getActiveState = (state: RootState) => state.active;

export const getActiveTab = createSelector([getActiveState], ({ active }) => active);

export const getTheme = createSelector([getActiveState], ({ theme }) => theme);

export const getLanguage = createSelector([getActiveState], ({ language }) => language);

export const getRecipient = createSelector([getActiveState], ({ recipient }) => recipient);

export const getRender = createSelector([getActiveState], ({ render }) => render);

export const getAllActiveProperties = createStructuredSelector({
  activeTab: getActiveTab,
  theme: getTheme,
  language: getLanguage,
  recipient: getRecipient,
  render: getRender,
});
