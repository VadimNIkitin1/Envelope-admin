import React from 'react';
import { useAppSelector } from '../../types/hooks';

import clsx from 'clsx';
import style from './StoreCard.module.scss';

const StoreCard = (props) => {
  const theme = useAppSelector((state) => state.active.theme);
  return (
    <div className={clsx(style.card, theme && style.light)}>
      <p>{props.name}</p>
    </div>
  );
};

export default StoreCard;
