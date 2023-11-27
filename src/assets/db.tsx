// export const storeCard = [
//   "Магазин №1",
//   "Магазин №2",
//   "Магазин №3",
//   "Магазин №4",
//   "Магазин №5",
// ];

export interface ITariff {
  term: string;
  price: string;
  id: number;
}

export const tariff: ITariff[] = [
  { term: '1 месяц', price: '2990', id: 1 },
  { term: '3 месяца', price: '8490', id: 2 },
  { term: '6 месяцев', price: '16990', id: 3 },
  { term: '1 год', price: '29990', id: 4 },
];

export interface IClients {
  name: string;
  userId: number;
  id: number;
}

export const clients: IClients[] = [
  { name: 'VadimNikitin', userId: 1234, id: 1 },
  { name: 'SwarowskyDmitry', userId: 1111, id: 2 },
  { name: 'RyhlovNikita', userId: 4321, id: 3 },
];

export interface IAnalytic {
  id: number;
  name: string;
  quantity: number;
}

export const analytic: IAnalytic[] = [
  {
    id: 1,
    name: 'Выполнено заказов',
    quantity: 1234,
  },
  {
    id: 2,
    name: 'Кол-во клиентов',
    quantity: 1212,
  },
  {
    id: 3,
    name: 'Заказов на сумму:',
    quantity: 1234,
  },
];

export interface ISettings {
  id: number;
  name: string;
  values: string;
}

export const settings: ISettings[] = [
  { name: 'График работы', values: '10:00-20:00', id: 1 },
  { name: 'Язык', values: 'Русский', id: 2 },
];
