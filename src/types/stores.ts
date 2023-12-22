export interface IStore {
  id: number;
  bot_tokens: {
    token_bot: string;
  };
  info: {
    name: string;
    adress: string;
    number_phone: string;
    mobile_phone: string;
    latitude: number;
    longitude: number;
    link_bot: string;
    time_zone: string;
    format_unified: boolean;
    format_24_7: boolean;
    format_custom: boolean;
    open_hours_default: string;
    close_hours_default: string;
  };
  subscriptions: {
    is_active: boolean;
    subscription_start_date: string;
    subscription_duration_months: number;
    paused_at: string;
  };
  association: [
    {
      order_type_id: number;
      is_active: boolean;
      order_type: {
        id: number;
        name: string;
        image: string;
      };
    }
  ];
  working_days: [
    {
      store_id: number;
      day_of_week_id: number;
      opening_time: string;
      closing_time: string;
      is_working: boolean;
      days_of_week: {
        id: number;
        day_of_week: string;
        number_day: number;
      };
    }
  ];
  payments: {
    cash: boolean;
    card: boolean;
    min_delivery_amount: number;
    min_order_amount_for_free_delivery: number;
    store_id: number;
  };
  delivery_distance: {
    start_price: number;
    price_per_km: number;
    min_price: number;
    store_id: number;
  };
  delivery_fix: {
    price: number;
    store_id: number;
  };
  delivery_district: {
    name: string;
    price: number;
    id: number;
    store_id: number;
  };
  service_text_and_chats: {
    email: string;
    welcome_message_bot: string;
    welcome_image: string;
    tg_id_group: number;
    delivery_chat: number;
    order_chat: number;
    completed_orders_chat: number;
    canceled_orders_chat: number;
    store_id: number;
  };
  legal_information: {
    full_organization_name: string;
    legal_adress: string;
    legal_number_phone: string;
    inn: number;
    ogrn: number;
    postal_code: number;
    store_id: number;
  };
}

export interface IStoreInitialState {
  stores: IStore[];
  store: IStore;
  idStoreForDelete: number | string;
  loading: boolean;
  error: string | null;
}
