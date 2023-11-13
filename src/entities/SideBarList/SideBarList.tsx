import { useAppDispatch, useAppSelector } from '../../types/hooks';

import BurgerButton from '../../shared/BurgerButton/BurgerButton';

import style from './SideBarList.module.scss';
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
import { PATHNAME } from './SideBarList.data';

import { toggleSidebar, toggleTabs } from '../../store/activeSlice';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const SideBarList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeTab = useAppSelector((state) => state.active.active);
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');

  if (!company_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const SIDEBAR_LIST_USER = [
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

  const SIDEBAR_LIST_STORE = [
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

  return (
    <div>
      {!store_id
        ? SIDEBAR_LIST_USER.map((el) => (
            <Link
              key={el.link}
              className={clsx(
                style.item,
                activeTab === `/${company_id}/${el.link}` && style.active,
                theme && style.light
              )}
              to={`/${company_id}${el.link}`}
              onClick={() => dispatch(toggleTabs(`/${company_id}/${el.link}`))}
            >
              <el.icon />
            </Link>
          ))
        : SIDEBAR_LIST_STORE.map((el) => (
            <Link
              key={el.link}
              className={clsx(
                style.item,
                activeTab === `/${company_id}${el.link}` && style.active,
                theme && style.light
              )}
              to={`/${company_id}${el.link}`}
              onClick={() => dispatch(toggleTabs(`/${company_id}${el.link}`))}
            >
              <el.icon />
            </Link>
          ))}
      {<BurgerButton onClick={() => dispatch(toggleSidebar(false))} />}
    </div>
  );
};

export default SideBarList;
