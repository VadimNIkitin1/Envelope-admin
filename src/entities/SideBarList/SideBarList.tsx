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
} from 'react-icons/md';

import { IoExitOutline } from 'react-icons/io5';
import { PATHNAME } from '../../app/constants';

import { toggleTabs, triggerRender } from '../../store/activeSlice';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { Tooltip, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { logOut } from '../../store/authSlice';
import { useEffect } from 'react';
import { getStores } from '../../store/storeSlice';

interface IStoresForMenu {
  name: string;
  link: string;
  id: string | number;
}

const SideBarList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const render = useAppSelector((state) => state.active.render);
  const activeTab = useAppSelector((state) => state.active.active);
  const stores = useAppSelector((state) => state.store.stores);
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');
  console.log(stores);

  useEffect(() => {
    dispatch(getStores());
  }, [render]);

  const storesForMenu: IStoresForMenu[] = [];
  stores.map((el) =>
    storesForMenu.push({
      name: el.info.name,
      link: `${company_id}/${el.id}${PATHNAME.SETTINGS}`,
      id: el.id,
    })
  );

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

  const handleClick = (el) => {
    localStorage.setItem('store_id', el.id);
    dispatch(toggleTabs(`/${company_id}${el.link}`));
    dispatch(triggerRender());
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
    {
      link: `/${store_id}${PATHNAME.SETTINGS}`,
      icon: MdOutlineSettings,
      name: 'Настройки магазина',
    },
    {
      link: `/${store_id}${PATHNAME.PRODUCTS}`,
      icon: MdOutlineMenuBook,
      name: 'Каталог',
      subcategory: [
        {
          name: 'Категории',
          link: `${company_id}/${store_id}${PATHNAME.CATEGORIES}`,
          id: store_id,
        },
        {
          name: 'Продукты',
          link: `${company_id}/${store_id}${PATHNAME.PRODUCTS}`,
          id: store_id,
        },
      ],
    },
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
      link: `/${store_id}${PATHNAME.STORES}`,
      icon: MdStore,
      name: 'Магазины',
      subcategory: storesForMenu,
    },
    {
      link: `/${store_id}${PATHNAME.TARRIFS}`,
      icon: MdPriceChange,
      name: 'Тарифы',
    },
  ];

  return (
    <div>
      {!store_id
        ? SIDEBAR_LIST_USER.map((el) => (
            <Tooltip label={el.name} key={el.name} placement="right">
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
            <div key={el.name}>
              {!el.subcategory ? (
                <Tooltip label={el.name} placement="right">
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
              ) : (
                <Menu>
                  <Tooltip label={el.name} placement="right">
                    <MenuButton
                      onClick={() => dispatch(toggleTabs(`/${company_id}${el.link}`))}
                      className={clsx(
                        style.item,
                        activeTab === `/${company_id}${el.link}` && style.active,
                        theme && style.light
                      )}
                    >
                      <el.icon />
                    </MenuButton>
                  </Tooltip>
                  <MenuList backgroundColor={'#212121'}>
                    {el.subcategory?.map((el) => (
                      <MenuItem
                        backgroundColor={'#212121'}
                        key={el.name}
                        className={style.subcategory_item}
                        onClick={() => handleClick(el)}
                      >
                        <Link to={el.link}>{el.name}</Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </div>
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
