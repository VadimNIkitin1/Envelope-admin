import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  IRequestCheckboxPayment,
  IRequestCheckboxTypeOrder,
  IRequestPhoto,
  IStore,
  IStoreInitialState,
} from '@/types/stores';

import { IRequestCategory } from '@/widgets/Modals/ModalCategories/types';
import { IRequestLegalInfo } from '@/widgets/Modals/ModalLegalInfo/types';
import { IRequestChats } from '@/widgets/Modals/ModalChats/types';
import { IRequestPayments } from '@/widgets/Modals/ModalPayments/types';
import { IRequestTokenBot } from '@/widgets/Modals/ModalToken/types';
import { IRequestInfo } from '@/widgets/Modals/ModalInfo/types';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  makeApiRequest,
} from './api';

const initialState: IStoreInitialState = {
  stores: [],
  store: {
    id: 0,
    bot_tokens: {
      token_bot: '',
    },
    info: {
      name: '',
      adress: '',
      number_phone: '',
      mobile_phone: '',
      latitude: 0,
      longitude: 0,
      link_bot: '',
      time_zone: '',
      format_unified: false,
      format_24_7: false,
      format_custom: false,
      open_hours_default: '',
      close_hours_default: '',
    },
    subscriptions: {
      is_active: false,
      subscription_start_date: '',
      subscription_duration_months: 0,
      paused_at: '',
    },
    association: [
      {
        order_type_id: 0,
        is_active: false,
        order_type: {
          id: 0,
          name: '',
          image: '',
        },
      },
    ],
    working_days: [
      {
        store_id: 0,
        day_of_week_id: 0,
        opening_time: '',
        closing_time: '',
        is_working: false,
        days_of_week: {
          id: 0,
          day_of_week: '',
          number_day: 0,
        },
      },
    ],
    payments: {
      cash: false,
      card: false,
      min_delivery_amount: 0,
      min_order_amount_for_free_delivery: 0,
      store_id: 0,
    },
    delivery_info: '',
    delivery_distance: {
      start_price: 0,
      price_per_km: 0,
      min_price: 0,
      store_id: 0,
    },
    delivery_fix: {
      price: 0,
      store_id: 0,
    },
    delivery_district: {
      name: '',
      price: 0,
      id: 0,
      store_id: 0,
    },
    service_text_and_chats: {
      email: '',
      welcome_message_bot: '',
      welcome_image: '',
      tg_id_group: 0,
      delivery_chat: 0,
      order_chat: 0,
      completed_orders_chat: 0,
      canceled_orders_chat: 0,
      store_id: 0,
    },
    legal_information: {
      full_organization_name: '',
      legal_adress: '',
      legal_number_phone: '',
      inn: 0,
      ogrn: 0,
      postal_code: 0,
    },
  },
  image_welcome: '',
  loading: false,
  error: null,
};

export const getStores = createAsyncThunk<IStore[], undefined, { rejectValue: Error }>(
  'store/getStores',
  async (_, { rejectWithValue }) => {
    try {
      return await makeApiRequest('get', 'store/');
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const getOneStore = createAsyncThunk<IStore, string | undefined, { rejectValue: Error }>(
  'store/getOneStore',
  async (id, { rejectWithValue }) => {
    try {
      return await makeApiRequest('get', `store/one/?store_id=${id}`);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const addStore = createAsyncThunk<IStore, IRequestCategory, { rejectValue: Error }>(
  'store/addStore',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('post', 'store/', {
        data: {
          name: data.name,
          link_bot: data.link_bot,
        },
        token_bot: {
          token_bot: data.token_bot,
        },
      });
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editActivityStore = createAsyncThunk<
  IStore[],
  number | undefined,
  { rejectValue: Error }
>('store/editActivityStore', async (id, { rejectWithValue }) => {
  try {
    return await makeApiRequest('patch', `store/update_activity/?store_id=${id}`);
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const editLegalInfo = createAsyncThunk<IStore[], IRequestLegalInfo, { rejectValue: Error }>(
  'store/editLegalInfo',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `store/legal_informations/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editTokenBot = createAsyncThunk<string, IRequestTokenBot, { rejectValue: Error }>(
  'store/editTokenBot',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `store/token_bot/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editChats = createAsyncThunk<string, IRequestChats, { rejectValue: Error }>(
  'store/editChats',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `store/service_text_and_chats/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editPayments = createAsyncThunk<IStore[], IRequestPayments, { rejectValue: Error }>(
  'store/editPayments',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `store/store_payments/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editInfo = createAsyncThunk<IStore[], IRequestInfo, { rejectValue: Error }>(
  'store/editInfo',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest('put', `store/store_info/?store_id=${data.id}`, data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const uploadWelcomeImage = createAsyncThunk<string, IRequestPhoto, { rejectValue: Error }>(
  'store/uploadWelcomeImage',
  async (data, { rejectWithValue }) => {
    try {
      return await makeApiRequest(
        'post',
        `product/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const deleteStore = createAsyncThunk<string, string | undefined, { rejectValue: Error }>(
  'store/deleteStore',
  async (id, { rejectWithValue }) => {
    try {
      return await makeApiRequest('delete', `store/?store_id=${id}`);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const editCheckboxPayment = createAsyncThunk<
  string,
  IRequestCheckboxPayment,
  { rejectValue: Error }
>('store/editCheckboxPayment', async (data, { rejectWithValue }) => {
  try {
    return await makeApiRequest(
      'patch',
      `store/store_payments/?store_id=${data.store_id}&checkbox=${data.checkbox}`
    );
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const editCheckboxTypeOrder = createAsyncThunk<
  string,
  IRequestCheckboxTypeOrder,
  { rejectValue: Error }
>('store/editCheckboxTypeOrder', async (data, { rejectWithValue }) => {
  try {
    return await makeApiRequest(
      'patch',
      `store/order_type/?store_id=${data.store_id}&order_type_id=${data.order_type_id}`
    );
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    clearWelcomeImage(state) {
      state.store.service_text_and_chats.welcome_image = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isRejectedAction, handleRejected);
  },
});

export const { clearWelcomeImage } = slice.actions;

export default slice.reducer;
