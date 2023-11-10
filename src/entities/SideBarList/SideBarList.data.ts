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

const company_id = localStorage.getItem('user_id');
const store_id = 1;

export const SIDEBAR_LIST = [
  { link: `/stores`, icon: MdStore },
  {
    link: '/tariffs',
    icon: MdPriceChange,
  },
  { link: `/categories`, icon: MdList },
  { link: `/menu`, icon: MdOutlineMenuBook },
  {
    link: `/clients`,
    icon: MdPeopleAlt,
  },
  {
    link: `/notification`,
    icon: MdMessage,
  },
  {
    link: '/analytic',
    icon: MdAnalytics,
  },
  {
    link: '/settings',
    icon: MdOutlineSettings,
  },
];

export const SIDEBAR_LIST_USER = [
  { link: '/stores', icon: MdStore },
  {
    link: '/tariffs',
    icon: MdPriceChange,
  },
  {
    link: '/analytic',
    icon: MdAnalytics,
  },
  {
    link: '/settings',
    icon: MdOutlineSettings,
  },
];

export const USER_PATHNAME = {
  STORES: `/${company_id}/stores`,
  TARRIFS: `/${company_id}/tariffs`,
  ANALYTIC: `/${company_id}/analytic`,
  SETTINGS: `/${company_id}/settings`,
};

export const SIDEBAR_LIST_STORE = [
  { link: `/${store_id}/categories`, icon: MdList },
  { link: `/${store_id}/menu`, icon: MdOutlineMenuBook },
  {
    link: `/${store_id}/clients`,
    icon: MdPeopleAlt,
  },
  {
    link: `/${store_id}/notification`,
    icon: MdMessage,
  },
  {
    link: `/${store_id}/settings`,
    icon: MdOutlineSettings,
  },
];

export const STORE_PATHNAME = {
  CATEGORIES: `/${company_id}/${store_id}/categories`,
  MENU: `/${company_id}/${store_id}/menu`,
  CLIENTS: `/${company_id}/${store_id}/clients`,
  NOTIFICATION: `/${company_id}/${store_id}/notification`,
  SETTINGS: `/${company_id}/${store_id}/settings`,
};
