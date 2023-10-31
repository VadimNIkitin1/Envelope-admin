import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import style from './Layout.module.scss';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import BurgerButton from '../../shared/BurgerButton/BurgerButton';
import React from 'react';

const Layout = () => {
  return (
    <div className={style.page}>
      <div className={style.navbar}>
        <NavBar />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
      <SideBar />
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
