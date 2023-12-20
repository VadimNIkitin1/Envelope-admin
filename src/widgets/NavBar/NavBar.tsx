import { Link } from 'react-router-dom';
import { toggleTabs } from '../../store/activeSlice';
import { GiEnvelope } from 'react-icons/gi';

import style from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { clsx } from 'clsx';

import { useLocalStorage } from '../../features/hooks/useLocalStorage';

import { PATHNAME } from '../../app/constants';
import { useEffect } from 'react';
import { getStores } from '../../store/storeSlice';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const render = useAppSelector((state) => state.active.render);
  const theme = useAppSelector((state) => state.active.theme);
  const stores = useAppSelector((state) => state.store.stores);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');

  const store = stores.filter((store) => String(store.id) === store_id)[0];

  useEffect(() => {
    dispatch(getStores());
  }, [render]);

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
    </nav>
  );
};

export default NavBar;
