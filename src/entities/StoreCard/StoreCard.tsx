import { Link, useLocation, useParams } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { PATHNAME } from '@/app/constants';

import { Button } from '@/shared/Button';

import { ModalType, toggleModal } from '@/store/modalsSlice';
import { toggleTabs, triggerRender } from '@/store/activeSlice/activeSlice';
import { getAllActiveProperties } from '@/store/activeSlice/selectors';

import { clsx } from 'clsx';
import style from './StoreCard.module.scss';

const StoreCard = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { company_id } = useParams();

  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

  const handleClick = () => {
    dispatch(triggerRender());
    dispatch(toggleTabs(PATHNAME.SETTINGS));
  };

  const handleDelete = () => {
    dispatch(toggleModal({ action: true, type: ModalType.DELETE }));
  };

  return (
    <>
      {location.pathname.includes(PATHNAME.STORES) && (
        <Link
          to={`/${company_id}/${props.id}/settings`}
          className={clsx(style.card, theme && style.light)}
          onClick={() => handleClick()}
        >
          <div className={style.container_card}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className={style.card_title}>{props.info ? props.info.name : 'не найдено'}</p>
              <div style={{ display: 'flex' }}>
                <Tooltip label="Удалить" placement="top">
                  <button style={{ height: '40px' }} onClick={(e) => e.preventDefault()}>
                    <Button view="delete" onClick={() => handleDelete()}>
                      <MdDeleteForever />
                    </Button>
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className={style.info_container}>
              <p className={clsx(style.status, theme && style.light)}>
                {props.subscriptions && props.subscriptions.is_active ? 'Активный' : 'Неактивный'}
                <IoIosArrowDown />
              </p>
              <div className={style.creation_date}>
                <p>Оплачено до:</p>
                <p className={style.pay_date_info}>23.12.2023</p>
              </div>
            </div>
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

export { StoreCard };
