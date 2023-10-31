import React from 'react';
import { useAppSelector, useAppDispatch } from '../../types/hooks';
import { Link } from 'react-router-dom';
import style from './SideBarItem.module.scss';
import { toggleTabs } from '../../store/activeSlice';
import clsx from 'clsx';

const SideBarItem = ({ item }) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.active.active);
  const theme = useAppSelector((state) => state.active.theme);
  const company_id = useAppSelector((state) => state.auth.company_id);

  const { link, icon } = item;

  return (
    <Link
      className={clsx(
        style.item,
        activeTab === `/${company_id}${link}` && style.active,
        theme && style.light
      )}
      to={`/${company_id}${link}`}
      onClick={() => dispatch(toggleTabs(`/${company_id}${link}`))}
    >
      {icon}
    </Link>
  );
};

export default SideBarItem;
