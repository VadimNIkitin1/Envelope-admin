import { useAppDispatch, useAppSelector } from '../../types/hooks';

import BurgerButton from '../../shared/BurgerButton/BurgerButton';
import { SIDEBAR_LIST } from './SideBarList.data';
import style from './SideBarList.module.scss';

import { toggleSidebar, toggleTabs } from '../../store/activeSlice';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const SideBarList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeTab = useAppSelector((state) => state.active.active);
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('user_id', '');

  if (!company_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div>
      {SIDEBAR_LIST.map((el) => (
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
      ))}
      {<BurgerButton onClick={() => dispatch(toggleSidebar(false))} />}
    </div>
  );
};

export default SideBarList;
