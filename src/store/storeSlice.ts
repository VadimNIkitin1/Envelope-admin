import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { IStore, IStoreInitialState } from '@/types/stores';

import { IRequestCategory } from '@/widgets/Modals/ModalCategories/types';
import { IRequestLegalInfo } from '@/widgets/Modals/ModalLegalInfo/types';
import { IRequestChats } from '@/widgets/Modals/ModalChats/types';
import { IRequestPayments } from '@/widgets/Modals/ModalPayments/types';
import { IRequestTokenBot } from '@/widgets/Modals/ModalToken/types';
import { IRequestInfo } from '@/widgets/Modals/ModalInfo/types';
import { ApiError } from '.';

const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

interface IRequestPhoto {
  store_id: string | number | undefined;
  formData: FormData;
}

interface IRequestCheckboxPayment {
  store_id: string | number | undefined;
  checkbox: string;
}

interface IRequestCheckboxTypeOrder {
  store_id: string | number | undefined;
  order_type_id: number;
}

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

export const getStores = createAsyncThunk<IStore[], undefined, { rejectValue: string }>(
  'store/getStores',
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.get('store/');
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const getOneStore = createAsyncThunk<
  IStore,
  string | number | undefined,
  { rejectValue: string }
>('store/getOneStore', async (id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.get(`store/one/?store_id=${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const addStore = createAsyncThunk<IStore, IRequestCategory, { rejectValue: string }>(
  'store/addStore',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post('store/', {
        data: {
          name: data.name,
          link_bot: data.link_bot,
        },
        token_bot: {
          token_bot: data.token_bot,
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const editActivityStore = createAsyncThunk<
  IStore[],
  string | number | undefined,
  { rejectValue: string }
>('store/editActivityStore', async (id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(`store/update_activity/?store_id=${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const editLegalInfo = createAsyncThunk<IStore[], IRequestLegalInfo, { rejectValue: string }>(
  'store/editLegalInfo',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`store/legal_informations/?store_id=${data.id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const editTokenBot = createAsyncThunk<string, IRequestTokenBot, { rejectValue: string }>(
  'store/editTokenBot',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`store/token_bot/?store_id=${data.id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const editChats = createAsyncThunk<IStore[], IRequestChats, { rejectValue: string }>(
  'store/editChats',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(
        `store/service_text_and_chats/?store_id=${data.id}`,
        data
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const editPayments = createAsyncThunk<IStore[], IRequestPayments, { rejectValue: string }>(
  'store/editPayments',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`store/store_payments/?store_id=${data.id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const editInfo = createAsyncThunk<IStore[], IRequestInfo, { rejectValue: string }>(
  'store/editInfo',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.put(`store/store_info/?store_id=${data.id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const uploadWelcomeImage = createAsyncThunk<string, IRequestPhoto, { rejectValue: string }>(
  'store/uploadWelcomeImage',
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceAxios.post(
        `product/upload_photo/?store_id=${data.store_id}`,
        data.formData
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as ApiError;
        const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  }
);

export const deleteStore = createAsyncThunk<
  string,
  string | number | undefined,
  { rejectValue: string }
>('store/deleteStore', async (id, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.delete(`store/?store_id=${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const editCheckboxPayment = createAsyncThunk<
  string,
  IRequestCheckboxPayment,
  { rejectValue: string }
>('store/editCheckboxPayment', async (data, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(
      `store/store_payments/?store_id=${data.store_id}&checkbox=${data.checkbox}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

export const editCheckboxTypeOrder = createAsyncThunk<
  string,
  IRequestCheckboxTypeOrder,
  { rejectValue: string }
>('store/editCheckboxTypeOrder', async (data, { rejectWithValue }) => {
  try {
    const res = await instanceAxios.patch(
      `store/order_type/?store_id=${data.store_id}&order_type_id=${data.order_type_id}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('Произошла непредвиденная ошибка');
  }
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

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
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(getOneStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneStore.fulfilled, (state, action) => {
        state.store = action.payload;
        state.loading = false;
      })
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editActivityStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(editActivityStore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editLegalInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editLegalInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editTokenBot.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTokenBot.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPayments.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCheckboxPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCheckboxPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCheckboxTypeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCheckboxTypeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadWelcomeImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadWelcomeImage.fulfilled, (state, action) => {
        state.image_welcome = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearWelcomeImage } = slice.actions;

export default slice.reducer;
