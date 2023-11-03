import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';
import { toggleTabs } from '../../store/activeSlice';
import { GiEnvelope } from 'react-icons/gi';
import style from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { clsx } from 'clsx';
import Button from '../../shared/Button/Button';
import { logOut } from '../../store/authSlice';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.active.theme);
  const data = JSON.parse(localStorage.getItem('data') || '');
  const company_id = data.data.user_id;
  // const username = localStorage.getItem('username');
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <nav className={clsx(style.navbar, theme && style.light)}>
      <Link
        to={`/${company_id}/menu`}
        onClick={() => dispatch(toggleTabs(`/${company_id}/menu`))}
        className={clsx(style.logoText, theme && style.light)}
      >
        ENVELOPE <GiEnvelope className={style.logo} />
      </Link>
      <h1 className={style.username}>{data.data.username}</h1>
      <Button view="delete" onClick={() => handleLogOut()}>
        Выйти
      </Button>
      <ThemeSwitches />
    </nav>
  );
};

export default NavBar;
