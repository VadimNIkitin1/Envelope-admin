import { useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';

const StoreCard = ({ name }) => {
  const theme = useAppSelector((state) => state.active.theme);
  return (
    <div className={clsx(style.card, theme && style.light)}>
      <p>{name}</p>
    </div>
  );
};

export default StoreCard;
