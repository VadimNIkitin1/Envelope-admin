import { useAppDispatch, useAppSelector } from '../../types/hooks';

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
import { IoExitOutline } from 'react-icons/io5';
import { PATHNAME } from '../../app/constants';

import { toggleTabs, triggerRender } from '../../store/activeSlice';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { Tooltip } from '@chakra-ui/react';
import { logOut } from '../../store/authSlice';

const SideBarList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useAppSelector((state) => state.active.active);
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');

  const handleLogOut = () => {
    if (!store_id) {
      dispatch(logOut());
      navigate(PATHNAME.LOGIN);
    } else {
      navigate(`${company_id}${PATHNAME.STORES}`);
      localStorage.removeItem('store_id');
      dispatch(triggerRender());
    }
  };

  if (!company_id) {
    return <Navigate to={PATHNAME.LOGIN} state={{ from: location }} />;
  }

  const SIDEBAR_LIST_USER = [
    { link: PATHNAME.STORES, icon: MdStore, name: 'Магазины' },
    {
      link: PATHNAME.ANALYTIC,
      icon: MdAnalytics,
      name: 'Аналитика',
    },
    {
      link: PATHNAME.SETTINGS,
      icon: MdOutlineSettings,
      name: 'Настройки профиля',
    },
  ];

  const SIDEBAR_LIST_STORE = [
    { link: PATHNAME.STORES, icon: MdStore, name: 'Магазины' },
    { link: `/${store_id}${PATHNAME.CATEGORIES}`, icon: MdList, name: 'Категории' },
    { link: `/${store_id}${PATHNAME.PRODUCTS}`, icon: MdOutlineMenuBook, name: 'Продукты' },
    {
      link: `/${store_id}${PATHNAME.CLIENTS}`,
      icon: MdPeopleAlt,
      name: 'Клиенты',
    },
    {
      link: `/${store_id}${PATHNAME.ANALYTIC}`,
      icon: MdAnalytics,
      name: 'Аналитика магазина',
    },
    {
      link: `/${store_id}${PATHNAME.NOTIFICATION}`,
      icon: MdMessage,
      name: 'Рассылка',
    },
    {
      link: `/${store_id}${PATHNAME.SETTINGS}`,
      icon: MdOutlineSettings,
      name: 'Настройки магазина',
    },
    {
      link: PATHNAME.TARRIFS,
      icon: MdPriceChange,
      name: 'Тарифы',
    },
  ];

  return (
    <div>
      {!store_id
        ? SIDEBAR_LIST_USER.map((el) => (
            <Tooltip label={el.name} key={el.name}>
              <Link
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
            </Tooltip>
          ))
        : SIDEBAR_LIST_STORE.map((el) => (
            <Tooltip label={el.name} key={el.name}>
              <Link
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
            </Tooltip>
          ))}
      <div
        className={clsx(style.item, theme && style.light)}
        style={{ color: 'red' }}
        onClick={() => handleLogOut()}
      >
        <Tooltip label={store_id ? 'Выйти из магазина' : 'Выйти из профиля'}>
          <span>
            <IoExitOutline />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default SideBarList;
