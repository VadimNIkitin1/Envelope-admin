import { createSlice } from '@reduxjs/toolkit';
import { ITableHeaders } from '../types/tableHeaders';

const initialState: ITableHeaders = {
  tableHeaderCategories: [
    { name: 'Наименование', code: 'name_rus', type: 'str' },
    { name: 'В наличии', code: 'availability', type: 'checkbox' },
  ],
  tableHeaderMenu: [
    { name: 'Наименование', code: 'name_rus', type: 'str' },
    { name: 'Категория', code: 'category_id', type: 'str' },
    { name: 'Цена', code: 'price', type: 'str' },
    { name: 'В наличии', code: 'availability', type: 'checkbox' },
    { name: 'Популярное', code: 'popular', type: 'checkbox' },
    { name: 'Самовывоз', code: 'takeaway', type: 'checkbox' },
    { name: 'Доставка', code: 'delivery', type: 'checkbox' },
    { name: 'Зал', code: 'dinein', type: 'checkbox' },
  ],
  tableHeaderClients: [
    { name: 'User Name', code: 'name', type: 'str' },
    { name: 'User ID', code: 'userId', type: 'str' },
    { name: 'ФИО', code: 'fullName', type: 'str' },
    { name: 'Телефон', code: 'phone', type: 'str' },
    { name: 'Адрес', code: 'Address', type: 'str' },
    { name: 'Сумма заказов', code: 'full_order', type: 'str' },
    { name: 'Последний заказ', code: 'last_order', type: 'str' },
  ],
  tableHeaderAnalytic: [
    { name: 'Метрика', code: 'name', type: 'str' },
    { name: 'Показатель', code: 'quantity', type: 'str' },
  ],
  tableHeaderSettings: [
    { name: 'Настройки', code: 'name', type: 'str' },
    { name: '', code: 'values', type: 'str' },
  ],
};

const slice = createSlice({
  name: 'tableHeader',
  initialState,
  reducers: {},
});

export default slice.reducer;
