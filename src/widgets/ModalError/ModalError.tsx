import React from 'react';

import { ModalType, toggleModal } from '../../store/modalsSlice';

import Button from '../../shared/Button/Button';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './ModalError.module.scss';

const ModalError = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.categories);

  return (
    <div
      className={style.wrapper}
      onClick={() => dispatch(toggleModal({ action: false, type: ModalType.ERROR }))}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        {error && <h1 className={style.modalTitle}>{error.detail}</h1>}
        <Button
          view="delete"
          onClick={() => dispatch(toggleModal({ action: false, type: ModalType.ERROR }))}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default ModalError;
