import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { toggleSidebar } from '../../store/activeSlice';
import { PATHNAME } from '../../app/constants';
import Button from '../../shared/Button/Button';
import { MdDeleteForever, MdOutlineEditCalendar } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { saveStore } from '../../store/storeSlice';

const StoreCard = (props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');

  const handleClick = () => {
    localStorage.setItem('store_id', props.id);
    dispatch(toggleSidebar(false));
  };

  const handleEdit = (store) => {
    dispatch(toggleModal({ action: true, type: ModalType.EDIT_STORES }));
    dispatch(saveStore(store));
  };

  const handleDelete = (store) => {
    dispatch(toggleModal({ action: true, type: ModalType.DELETE }));
    dispatch(saveStore(store));
  };

  return (
    <>
      {location.pathname.includes(PATHNAME.STORES) && (
        <Link
          to={`/${company_id}/${props.id}/categories`}
          className={clsx(style.card, theme && style.light)}
          onClick={() => handleClick()}
        >
          <p className={style.card_title}>{props.name}</p>
          <div style={{ display: 'flex' }}>
            <Tooltip label="Редактировать" placement="top">
              <span style={{ height: '40px' }} onClick={(e) => e.preventDefault()}>
                <Button view="add" onClick={() => handleEdit(props)}>
                  <MdOutlineEditCalendar />
                </Button>
              </span>
            </Tooltip>
            <Tooltip label="Удалить" placement="top">
              <span style={{ height: '40px' }} onClick={(e) => e.preventDefault()}>
                <Button view="delete" onClick={() => handleDelete(props)}>
                  <MdDeleteForever />
                </Button>
              </span>
            </Tooltip>
          </div>
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
