import { useAppSelector } from '../../types/hooks';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

import style from './BurgerButton.module.scss';
import { clsx } from 'clsx';
import { Tooltip } from '@mui/material';

interface Props {
  onClick: () => void;
}

const BurgerButton = (props: Props) => {
  const sidebar = useAppSelector((state) => state.active.sidebar);
  const theme = useAppSelector((state) => state.active.theme);
  return (
    <button {...props} className={clsx(style.button, theme && style.light)}>
      {sidebar ? (
        <Tooltip title="Меню">
          <MdOutlineKeyboardDoubleArrowUp />
        </Tooltip>
      ) : (
        <Tooltip title="Меню" placement="bottom">
          <GiHamburgerMenu />
        </Tooltip>
      )}
    </button>
  );
};

export default BurgerButton;
