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

export const SIDEBAR_LIST = [
  { link: '/shops', icon: MdStore },
  {
    link: '/prices',
    icon: MdPriceChange,
  },
  { link: '/categories', icon: MdList },
  { link: '/menu', icon: MdOutlineMenuBook },
  {
    link: '/clients',
    icon: MdPeopleAlt,
  },
  {
    link: '/notification',
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
