import { Link, useNavigate, useParams } from 'react-router-dom';
import { GiEnvelope } from 'react-icons/gi';
import { IoExitOutline } from 'react-icons/io5';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { HiDotsVertical } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { LANGUAGE, PATHNAME } from '@/app/constants';
import { ThemeSwitches } from '@/shared/ThemeSwitches/ThemeSwitches';

import { toggleLanguage, toggleTabs } from '@/store/activeSlice';
import { logOut } from '@/store/authSlice';

import { clsx } from 'clsx';
import style from './NavBar.module.scss';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { store_id, company_id } = useParams();
  const { theme, language } = useAppSelector((state) => state.active);
  const { store } = useAppSelector((state) => state.store);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate(PATHNAME.LOGIN);
  };

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
        Rékka <GiEnvelope className={style.logo} />
      </Link>
      {store_id ? <div className={style.store_name}>{store.info.name}</div> : null}
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
          <MenuItem
            backgroundColor={'#212121'}
            className={clsx(style.menu_item, theme && style.light)}
            onClick={() => handleLogOut()}
          >
            <p
              className={clsx(style.menu_item__title, theme && style.light)}
              style={{ color: 'red' }}
            >
              Выйти
            </p>
            <IoExitOutline style={{ color: 'red', fontSize: '25px' }} />
          </MenuItem>
        </MenuList>
      </Menu>
    </nav>
  );
};

export { NavBar };
