import { useLocation } from 'react-router';

import { SideBarList } from '@/entities/SideBarList';

import { useAppSelector } from '@/types/hooks';

import { PATHNAME } from '@/app/constants';

import { clsx } from 'clsx';
import style from './SideBar.module.scss';

const SideBar = () => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.active.theme);

  return location.pathname.includes(PATHNAME.STORES) ? null : (
    <section className={clsx(style.sidebar, theme && style.light)}>
      <SideBarList />
    </section>
  );
};
export { SideBar };
