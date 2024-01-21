import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getStoresState = (state: RootState) => state.store;

const getStoresSelector = createSelector([getStoresState], ({ stores }) => stores);

const getOneStoreSelector = createSelector([getStoresState], ({ store }) => store);

const getStoreInfoSelector = createSelector([getStoresState], ({ store }) => store.info);

const getTokenBot = createSelector([getStoresState], ({ store }) => store.bot_tokens.token_bot);

export const getAllStoresProperties = createStructuredSelector({
  stores: getStoresSelector,
  store: getOneStoreSelector,
  info: getStoreInfoSelector,
  token_bot: getTokenBot,
});
