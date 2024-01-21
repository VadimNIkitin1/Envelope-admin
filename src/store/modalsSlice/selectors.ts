import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from '@/store/index';

const getModalsState = (state: RootState) => state.modals;

const getModalCategories = createSelector(
  [getModalsState],
  ({ modalCategories }) => modalCategories
);

const getModalEditCategories = createSelector(
  [getModalsState],
  ({ modalEditCategories }) => modalEditCategories
);

const getModalProducts = createSelector([getModalsState], ({ modalProducts }) => modalProducts);

const getModalEditProducts = createSelector(
  [getModalsState],
  ({ modalEditProducts }) => modalEditProducts
);

const getModalStores = createSelector([getModalsState], ({ modalStores }) => modalStores);

const getModalEditStores = createSelector(
  [getModalsState],
  ({ modalEditStores }) => modalEditStores
);

const getModalForDelete = createSelector([getModalsState], ({ modalForDelete }) => modalForDelete);

const getModalRecipient = createSelector([getModalsState], ({ modalRecipient }) => modalRecipient);

const getModalLegalInfo = createSelector([getModalsState], ({ modalLegalInfo }) => modalLegalInfo);

const getModalChats = createSelector([getModalsState], ({ modalChats }) => modalChats);

const getModalPayments = createSelector([getModalsState], ({ modalPayments }) => modalPayments);

const getModalTokenBot = createSelector([getModalsState], ({ modalTokenBot }) => modalTokenBot);

const getModalInfo = createSelector([getModalsState], ({ modalInfo }) => modalInfo);

export const getAllModalsProperties = createStructuredSelector({
  modalCategories: getModalCategories,
  modalEditCategories: getModalEditCategories,
  modalProducts: getModalProducts,
  modalEditProducts: getModalEditProducts,
  modalStores: getModalStores,
  modalEditStores: getModalEditStores,
  modalForDelete: getModalForDelete,
  modalRecipient: getModalRecipient,
  modalLegalInfo: getModalLegalInfo,
  modalChats: getModalChats,
  modalPayments: getModalPayments,
  modalTokenBot: getModalTokenBot,
  modalInfo: getModalInfo,
});
