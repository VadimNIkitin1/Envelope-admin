import { ReactNode } from 'react';

import { useAppDispatch } from '../../types/hooks';

import BurgerButton from '../../shared/BurgerButton/BurgerButton';
import SideBarItem from '../SideBarItem/SideBarItem';
import {
  MdOutlineMenuBook,
  MdMessage,
  MdAnalytics,
  MdOutlineSettings,
  MdPriceChange,
  MdPeopleAlt,
  MdStore,
  MdList,
} from 'react-icons/md';
import { toggleSidebar } from '../../store/activeSlice';

export interface ISideBarItem {
  link: string;
  icon: ReactNode;
}

const SIDEBAR_LIST: ISideBarItem[] = [
  { link: '/shops', icon: <MdStore /> },
  {
    link: '/prices',
    icon: <MdPriceChange />,
  },
  { link: '/categories', icon: <MdList /> },
  { link: '/menu', icon: <MdOutlineMenuBook /> },
  {
    link: '/clients',
    icon: <MdPeopleAlt />,
  },
  {
    link: '/notification',
    icon: <MdMessage />,
  },
  {
    link: '/analytic',
    icon: <MdAnalytics />,
  },
  {
    link: '/settings',
    icon: <MdOutlineSettings />,
  },
];

const SideBarList = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      {SIDEBAR_LIST.map((el, idx) => (
        <SideBarItem key={idx} {...el} />
      ))}
      {<BurgerButton onClick={() => dispatch(toggleSidebar(false))} />}
    </div>
  );
};

export default SideBarList;
