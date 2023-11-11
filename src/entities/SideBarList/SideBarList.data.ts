import {
  MdOutlineMenuBook,
  MdMessage,
  MdAnalytics,
  MdOutlineSettings,
  MdPriceChange,
  MdPeopleAlt,
  MdStore,
  MdList,
} from 'react-icons/md';

const store_id = localStorage.getItem('store_id');

export enum PATHNAME {
  STORES = `/stores`,
  TARRIFS = '/tariffs',
  CATEGORIES = '/categories',
  MENU = '/menu',
  CLIENTS = '/clients',
  NOTIFICATION = '/notification',
  ANALYTIC = '/analytic',
  SETTINGS = '/settings',
}

export const SIDEBAR_LIST_USER = [
  { link: PATHNAME.STORES, icon: MdStore },
  {
    link: PATHNAME.ANALYTIC,
    icon: MdAnalytics,
  },
  {
    link: PATHNAME.SETTINGS,
    icon: MdOutlineSettings,
  },
  {
    link: PATHNAME.TARRIFS,
    icon: MdPriceChange,
  },
];

export const SIDEBAR_LIST_STORE = [
  { link: `/${store_id}${PATHNAME.CATEGORIES}`, icon: MdList },
  { link: `/${store_id}${PATHNAME.MENU}`, icon: MdOutlineMenuBook },
  {
    link: `/${store_id}${PATHNAME.CLIENTS}`,
    icon: MdPeopleAlt,
  },
  {
    link: `/${store_id}${PATHNAME.NOTIFICATION}`,
    icon: MdMessage,
  },
  {
    link: `/${store_id}${PATHNAME.SETTINGS}`,
    icon: MdOutlineSettings,
  },
];
