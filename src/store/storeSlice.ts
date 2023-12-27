import axios from 'axios';
import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IStore, IStoreInitialState } from '../types/stores';
import { IRequestCategory } from '../widgets/Modal/types';

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/';
axios.defaults.withCredentials = true;

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
      store_id: 0,
    },
  },
  idStoreForDelete: 0,
  loading: false,
  error: null,
};

export const getStores = createAsyncThunk<IStore[], undefined, { rejectValue: string }>(
  'store/getStores',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.get('store/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneStore = createAsyncThunk<
  IStore,
  string | number | undefined,
  { rejectValue: string }
>('store/getOneStore', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.get(`store/one/?store_id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addStore = createAsyncThunk<IStore, IRequestCategory, { rejectValue: string }>(
  'store/addStore',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.post(
        'store/',
        {
          data: {
            name: data.name,
            link_bot: data.link_bot,
          },
          token_bot: {
            token_bot: data.token_bot,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Убран первоначальный вариант запроса на редактирование магазина за неактуальностью
// Оставил болванку для удобства (для будущих актуальных запросов)

// export const editStore = createAsyncThunk<IStore[], IRequestCategory, { rejectValue: string }>(
//   'store/editStore',
//   async (data, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const res = await axios.put(
//         `store/?store_id=${data.id}`,
//         { name: data.name },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const deleteStore = createAsyncThunk<
  string,
  string | number | undefined,
  { rejectValue: string }
>('store/deleteStore', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await axios.delete(`store/?store_id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    saveIdStoreForDelete(state, action) {
      state.idStoreForDelete = action.payload;
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { saveIdStoreForDelete } = slice.actions;

export default slice.reducer;
