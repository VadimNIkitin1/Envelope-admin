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
    {
      name: 'Минимальная сумма заказа для бесплатной доставки',
      code: 'min_order_amount_for_free_delivery',
    },
    { name: 'Минимальная сумма доставки', code: 'min_delivery_amount' },
  ],
};

export const TABLE_CHATS = {
  header: 'Служебные чаты',
  code: 'service_text_and_chats',
  data: [
    { name: 'Служебная почта', code: 'email' },
    { name: 'Приветственное сообщение бота', code: 'welcome_message_bot' },
    { name: 'Изображение при приветствии', code: 'welcome_image' },
    { name: 'Чат доставки', code: 'delivery_chat' },
    { name: 'Чат заказов', code: 'order_chat' },
    { name: 'Чат выполненых заказов', code: 'completed_orders_chat' },
    { name: 'Чат отмененных заказов', code: 'canceled_orders_chat' },
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
  ],
};
