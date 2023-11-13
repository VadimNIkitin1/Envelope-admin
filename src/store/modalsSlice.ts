import { createSlice } from '@reduxjs/toolkit';
import { IModals } from '../types/modals';

const initialState: IModals = {
  modalProducts: false,
  modalCategories: false,
  modalEditCategories: false,
  modalEditProducts: false,
  modalForDelete: false,
  modalStores: false,
};

export enum ModalType {
  CATEGORIES = 'categories',
  EDIT_CATEGORIES = 'edit_categories',
  PRODUCTS = 'products',
  EDIT_PRODUCTS = 'edit_products',
  DELETE = 'delete',
  ERROR = 'error',
  STORES = 'stores',
}

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal(state, action) {
      if (action.payload.type === ModalType.CATEGORIES) {
        state.modalCategories = action.payload.action;
      }

      if (action.payload.type === ModalType.EDIT_CATEGORIES) {
        state.modalEditCategories = action.payload.action;
      }

      if (action.payload.type === ModalType.PRODUCTS) {
        state.modalProducts = action.payload.action;
      }

      if (action.payload.type === ModalType.EDIT_PRODUCTS) {
        state.modalEditProducts = action.payload.action;
      }

      if (action.payload.type === ModalType.DELETE) {
        state.modalForDelete = action.payload.action;
      }

      if (action.payload.type === ModalType.STORES) {
        state.modalStores = action.payload.action;
      }
    },
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
