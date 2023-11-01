import { FC } from 'react';
import { useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';
import { ITariff } from '../../assets/db';

const StoreCard: FC<ITariff> = ({ price }) => {
  const theme = useAppSelector((state) => state.active.theme);
  return (
    <div className={clsx(style.card, theme && style.light)}>
      <p>{price}</p>
    </div>
  );
};

export default StoreCard;
