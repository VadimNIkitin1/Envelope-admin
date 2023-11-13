import { Link, useNavigate } from 'react-router-dom';
import { toggleTabs } from '../../store/activeSlice';
import { GiEnvelope, GiExitDoor } from 'react-icons/gi';
import style from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { clsx } from 'clsx';
import Button from '../../shared/Button/Button';
import { logOut } from '../../store/authSlice';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { Tooltip } from '@chakra-ui/react';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const [data] = useLocalStorage('data', '');
  const store_id = localStorage.getItem('store_id');

  const handleLogOut = () => {
    if (!store_id) {
      dispatch(logOut());
      navigate('/login');
    } else {
      navigate(`${company_id}/stores`);
      localStorage.removeItem('store_id');
    }
  };

  return (
    <nav className={clsx(style.navbar, theme && style.light)}>
      <Link
        to={store_id ? `/${company_id}/${store_id}/menu` : `/${company_id}/stores`}
        onClick={() => dispatch(toggleTabs(`/${company_id}/menu`))}
        className={clsx(style.logoText, theme && style.light)}
      >
        ENVELOPE <GiEnvelope className={style.logo} />
      </Link>
      <h1 className={style.username}>{data.data.username}</h1>
      <Tooltip label={store_id ? 'Выйти из магазина' : 'Выйти из профиля'} placement="bottom">
        <span>
          <Button view="delete" onClick={() => handleLogOut()}>
            <GiExitDoor />
          </Button>
        </span>
      </Tooltip>
    </nav>
  );
};

export default NavBar;
