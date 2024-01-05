export const TABLE_INFO = {
  header: 'О заведении',
  code: 'info',
  data: [
    {
      name: 'Название магазина',
      code: 'name',
    },
    {
      name: 'Адрес',
      code: 'adress',
    },
    {
      name: 'Номер телефона',
      code: 'number_phone',
    },
    {
      name: 'Ссылка на бота',
      code: 'link_bot',
    },
    {
      name: 'Часовой пояс',
      code: 'time_zone',
    },
    {
      name: 'График работы',
      list: [
        { name: '24/7', code: 'format_24_7' },
        { name: 'Единый', code: 'format_unified' },
        { name: 'Вариативный', code: 'format_custom' },
      ],
    },
  ],
};

export const TABLE_TOKEN = {
  header: 'Токен бота',
  code: 'bot_tokens',
  data: [{ name: 'Токен бота', code: 'token_bot' }],
};

export const TABLE_TYPE_ORDER = {
  header: 'Типы заказа',
  code: 'is_active',
  data: [
    {
      name: 'Типы заказа',
      code: '',
    },
  ],
};

export const TABLE_PAYMENTS = {
  header: 'Оплата',
  code: 'payments',
  data: [
    {
      name: 'Типы оплаты',
      list: [
        { name: 'Картой', code: 'card' },
        { name: 'Наличные', code: 'cash' },
      ],
    },
    { name: 'Минимальная сумма доставки', code: 'min_delivery_amount' },
    {
      name: 'Минимальная сумма заказа для бесплатной доставки',
      code: 'min_order_amount_for_free_delivery',
    },
  ],
};

export const TABLE_DELIVERY = {
  header: 'Доставка',
  code: 'delivery_info',
  data: [
    { name: 'Тип доставки', code: 'delivery_type' },
    { name: 'Минимальная сумма доставки', code: 'min_price_delivery' },
  ],
};

export const TABLE_CHATS = {
  header: 'Служебные чаты',
  code: 'service_text_and_chats',
  data: [
    { name: 'Служебная почта', code: 'email' },
    { name: 'Приветственное сообщение бота', code: 'welcome_message_bot' },
    { name: 'Чат доставки', code: 'delivery_chat' },
    { name: 'Чат заказов', code: 'order_chat' },
    { name: 'Чат выполненых заказов', code: 'completed_orders_chat' },
    { name: 'Чат отмененных заказов', code: 'canceled_orders_chat' },
    { name: 'Изображение при приветствии', code: 'welcome_image' },
  ],
};

export const TABLE_LEGAL = {
  header: 'Юридическая информация',
  code: 'legal_information',
  data: [
    { name: 'Полное наименование организации', code: 'full_organization_name' },
    { name: 'Юр адрес', code: 'legal_adress' },
    { name: 'Юр телефон', code: 'legal_number_phone' },
    { name: 'ИНН', code: 'inn' },
    { name: 'ОГРН', code: 'ogrn' },
    { name: 'Почтовый индекс', code: 'postal_code' },
  ],
};
