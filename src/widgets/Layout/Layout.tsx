import { Outlet } from 'react-router-dom';

import { NavBar } from '@/widgets/NavBar/';
import { SideBar } from '@/widgets/SideBar';
import { Footer } from '@/widgets/Footer';

import style from './Layout.module.scss';

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

export { Layout };
