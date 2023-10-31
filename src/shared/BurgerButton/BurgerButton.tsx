import React from 'react';
import { useAppSelector } from '../../types/hooks';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

import style from './BurgerButton.module.scss';

interface Props {
  onClick: () => void;
}

const BurgerButton = (props: Props) => {
  const sidebar = useAppSelector((state) => state.active.sidebar);
  return (
    <button {...props} className={style.button}>
      {sidebar ? <MdOutlineKeyboardDoubleArrowUp /> : <GiHamburgerMenu />}
    </button>
  );
};

export default BurgerButton;
