import { Link } from 'react-router-dom';
import { toggleLanguage, toggleTabs } from '../../store/activeSlice';
import { GiEnvelope } from 'react-icons/gi';

import style from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { clsx } from 'clsx';

import { useLocalStorage } from '../../features/hooks/useLocalStorage';

import { LANGUAGE, PATHNAME } from '../../app/constants';
import { useEffect } from 'react';
import { getStores } from '../../store/storeSlice';
import { HiDotsVertical } from 'react-icons/hi';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { render, theme, language } = useAppSelector((state) => state.active);
  const stores = useAppSelector((state) => state.store.stores);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');
  console.log(language);

  const store = stores.filter((store) => String(store.id) === store_id)[0];

  useEffect(() => {
    dispatch(getStores());
  }, [render]);

  const handleClickLanguage = (lang) => {
    dispatch(toggleLanguage(lang));
  };

  return (
    <nav className={clsx(style.navbar, theme && style.light)}>
      <Link
        to={
          store_id
            ? `/${company_id}/${store_id + PATHNAME.PRODUCTS}`
            : `/${company_id + PATHNAME.STORES}`
        }
        onClick={() => dispatch(toggleTabs(`/${company_id + PATHNAME.PRODUCTS}`))}
        className={clsx(style.logoText, theme && style.light)}
      >
        ENVELOPE <GiEnvelope className={style.logo} />
      </Link>
      {store && <div className={style.store_name}>{store.info.name}</div>}
      <Menu closeOnSelect={false}>
        <MenuButton>
          <HiDotsVertical color={theme ? '#000' : '#fff'} />
        </MenuButton>
        <MenuList
          backgroundColor={'#212121'}
          className={clsx(style.menu_list, theme && style.light)}
        >
          <MenuItem
            backgroundColor={'#212121'}
            className={clsx(style.menu_item, theme && style.light)}
            alignItems={'baseline'}
          >
            <p className={clsx(style.menu_item__title, theme && style.light)}>Тема</p>
            <ThemeSwitches />
          </MenuItem>
          <MenuItem
            backgroundColor={'#212121'}
            className={clsx(style.menu_item, theme && style.light)}
          >
            <p className={clsx(style.menu_item__title, theme && style.light)}>Язык</p>
            <div className={style.language}>
              <p
                className={clsx(
                  style.language_item,
                  language === LANGUAGE.RUSSIAN && style.checked,
                  theme && style.light
                )}
                onClick={() => handleClickLanguage(LANGUAGE.RUSSIAN)}
              >
                🇷🇺
              </p>
              <p
                className={clsx(
                  style.language_item,
                  language === LANGUAGE.ENGLAND && style.checked,
                  theme && style.light
                )}
                onClick={() => handleClickLanguage(LANGUAGE.ENGLAND)}
              >
                🇬🇧
              </p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </nav>
  );
};

export default NavBar;
