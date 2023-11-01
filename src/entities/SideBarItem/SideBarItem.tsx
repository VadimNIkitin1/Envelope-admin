import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../types/hooks';
import { Link, Navigate, useLocation } from 'react-router-dom';
import style from './SideBarItem.module.scss';
import { toggleTabs } from '../../store/activeSlice';
import { clsx } from 'clsx';
import { ISideBarItem } from '../SideBarList/SideBarList';

const SideBarItem: FC<ISideBarItem> = ({ link, icon }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeTab = useAppSelector((state) => state.active.active);
  const theme = useAppSelector((state) => state.active.theme);
  const company_id = localStorage.getItem('token');

  if (!company_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Link
      className={clsx(
        style.item,
        activeTab === `/${company_id}${link}` && style.active,
        theme && style.light
      )}
      to={`/${company_id}${link}`}
      onClick={() => dispatch(toggleTabs(`/${company_id}/${link}`))}
    >
      {icon}
    </Link>
  );
};

export default SideBarItem;
