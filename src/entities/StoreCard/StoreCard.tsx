import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { toggleSidebar } from '../../store/activeSlice';

const StoreCard = (props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');

  const handleClick = () => {
    localStorage.setItem('store_id', props.id);
    dispatch(toggleSidebar(false));
  };

  return (
    <Link
      to={`/${company_id}/${props.id}/categories`}
      className={clsx(style.card, theme && style.light)}
      onClick={() => handleClick()}
    >
      <p>{props.name}</p>
    </Link>
  );
};

export default StoreCard;
