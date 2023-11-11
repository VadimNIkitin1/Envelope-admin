import { useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const StoreCard = (props) => {
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');

  return (
    <Link
      to={`/${company_id}/${props.id}/categories`}
      className={clsx(style.card, theme && style.light)}
      onClick={() => localStorage.setItem('store_id', props.id)}
    >
      <p>{props.name}</p>
    </Link>
  );
};

export default StoreCard;
