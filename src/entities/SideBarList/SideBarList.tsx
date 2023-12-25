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

import { PATHNAME } from '../../app/constants';

import { toggleTabs, triggerRender } from '../../store/activeSlice';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { clsx } from 'clsx';

import { Tooltip, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getStores } from '../../store/storeSlice';

const SideBarList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { store_id, company_id } = useParams();
  const { render, theme, active } = useAppSelector((state) => state.active);

  useEffect(() => {
    dispatch(getStores());
  }, [render]);

  const handleClick = (el) => {
    if (el.link === '/stores') {
      dispatch(toggleTabs(`${el.link}`));
    }

    if (el.link === '/categories' || el.link === '/products') {
      dispatch(toggleTabs(`${el.link}`));
    }

    dispatch(toggleTabs(`${el.link}`));
    dispatch(triggerRender());
  };

  const handleClickSubcategory = (el) => {
    localStorage.setItem('store_id', el.id);
    dispatch(toggleTabs(`${PATHNAME.PRODUCTS}`));
    dispatch(triggerRender());
  };

  if (!company_id) {
    return <Navigate to={PATHNAME.LOGIN} state={{ from: location }} />;
  }

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
      link: `/${store_id}${PATHNAME.ANALYTIC}`,
      icon: MdAnalytics,
      name: 'Аналитика магазина',
    },
    {
      link: `/${store_id}${PATHNAME.CLIENTS}`,
      icon: MdPeopleAlt,
      name: 'Клиенты',
    },
    {
      link: `/${store_id}${PATHNAME.NOTIFICATION}`,
      icon: MdMessage,
      name: 'Рассылка',
    },
    {
      link: `/${store_id}${PATHNAME.TARRIFS}`,
      icon: MdPriceChange,
      name: 'Тарифы',
    },
    {
      link: `${PATHNAME.STORES}`,
      icon: MdStore,
      name: 'Магазины',
    },
  ];

  return (
    <div>
      {store_id &&
        SIDEBAR_LIST_STORE.map((el) => (
          <div key={el.name}>
            {!el.subcategory ? (
              <Tooltip label={el.name} placement="right">
                <Link
                  className={clsx(
                    style.item,
                    el.link.includes(active) && style.active,
                    theme && style.light
                  )}
                  to={`/${company_id}${el.link}`}
                  onClick={() => handleClick(el)}
                >
                  <el.icon />
                </Link>
              </Tooltip>
            ) : (
              <Menu>
                <Tooltip label={el.name} placement="right">
                  <MenuButton
                    onClick={() => dispatch(toggleTabs(`${el.link}`))}
                    className={clsx(
                      style.item,
                      el.link.includes(active) && style.active,
                      theme && style.light
                    )}
                  >
                    <el.icon />
                  </MenuButton>
                </Tooltip>
                <MenuList backgroundColor={'#212121'}>
                  {el.subcategory?.map((el) => (
                    <Link to={el.link}>
                      <MenuItem
                        backgroundColor={'#212121'}
                        key={el.name}
                        className={style.subcategory_item}
                        onClick={() => handleClickSubcategory(el)}
                      >
                        {el.name}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            )}
          </div>
        ))}
    </div>
  );
};

export default SideBarList;
