import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { toggleSidebar } from '../../store/activeSlice';
import { PATHNAME } from '../../app/constants';

const StoreCard = (props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const location = useLocation();

  const handleClick = () => {
    localStorage.setItem('store_id', props.id);
    dispatch(toggleSidebar(false));
  };

  return (
    <>
      {location.pathname.includes(PATHNAME.STORES) && (
        <Link
          to={`/${company_id}/${props.id}/categories`}
          className={clsx(style.card, theme && style.light)}
          onClick={() => handleClick()}
        >
          <p>{props.name}</p>
        </Link>
      )}
      {location.pathname.includes(PATHNAME.TARRIFS) && (
        <Link
          to={`/${company_id}/${props.id}/categories`}
          className={clsx(style.card, theme && style.light)}
          onClick={() => handleClick()}
        >
          <p>{props.term}</p>
          <p>{props.price}</p>
        </Link>
      )}
    </>
  );
};

export default StoreCard;
