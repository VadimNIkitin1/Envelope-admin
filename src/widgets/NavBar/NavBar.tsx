import { Link, useNavigate } from 'react-router-dom';
import { toggleTabs } from '../../store/activeSlice';
import { GiEnvelope } from 'react-icons/gi';
import { IoExitOutline } from 'react-icons/io5';
import style from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { clsx } from 'clsx';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { logOut } from '../../store/authSlice';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { PATHNAME } from '../../app/constants';
import { useEffect } from 'react';
import { getStores } from '../../store/storeSlice';
import { MdStore } from 'react-icons/md';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useAppSelector((state) => state.active.theme);
  const stores = useAppSelector((state) => state.store.stores);
  const [company_id] = useLocalStorage('company_id', '');
  const [data] = useLocalStorage('data', '');
  const store_id = localStorage.getItem('store_id');

  const handleLogOut = () => {
    if (!store_id) {
      dispatch(logOut());
      navigate(PATHNAME.LOGIN);
    } else {
      navigate(`${company_id}${PATHNAME.STORES}`);
      localStorage.removeItem('store_id');
    }
  };

  const store = stores.filter((store) => String(store.id) === store_id)[0];

  useEffect(() => {
    dispatch(getStores());
  }, []);

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
      <Menu>
        <MenuButton>
          <BsThreeDotsVertical className={clsx(style.dots, theme && style.light)} />
        </MenuButton>
        <MenuList backgroundColor={'#212121'}>
          <MenuItem backgroundColor={'#2c2c2c'} height={35} marginBottom={1}>
            <CgProfile fontSize={25} color="#7669c8" />
            <h1 className={style.username}>{data ? data?.data.username : null}</h1>
          </MenuItem>
          {store_id && (
            <MenuItem backgroundColor={'#2c2c2c'} height={35} marginBottom={1}>
              <MdStore fontSize={25} />
              <h2 className={style.store_name}>{store ? store.name : 'Не найден'}</h2>
            </MenuItem>
          )}
          <MenuItem backgroundColor={'#212121'} height={25} onClick={() => handleLogOut()}>
            {store_id ? (
              <p className={style.menu_text}>Выйти из магазина</p>
            ) : (
              <p className={style.menu_text}>Выйти из профиля</p>
            )}
            <IoExitOutline className={style.icon} />
          </MenuItem>
        </MenuList>
      </Menu>
    </nav>
  );
};

export default NavBar;
