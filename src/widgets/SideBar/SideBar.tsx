import style from './SideBar.module.scss';
import clsx from 'clsx';

import SideBarList from '../../entities/SideBarList/SideBarList';
import BurgerButton from '../../shared/BurgerButton/BurgerButton';
import { toggleSidebar } from '../../store/activeSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const SideBar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);
  const sidebar = useAppSelector((state) => state.active.sidebar);

  return sidebar ? (
    <section className={clsx(style.sidebar, theme && style.light)}>
      <SideBarList />
    </section>
  ) : (
    <section className={clsx(style.button, theme && style.light)}>
      <BurgerButton onClick={() => dispatch(toggleSidebar(true))} />
    </section>
  );
};

export default SideBar;
