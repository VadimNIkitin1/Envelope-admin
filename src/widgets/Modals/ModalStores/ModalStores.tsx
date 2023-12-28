import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { InputText } from '../../../shared/InputText/InputText';
import { Instruction } from '../../Instruction/Instruction';

import style from './ModalStores.module.scss';
import Button from '../../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { triggerRender } from '../../../store/activeSlice';
import { ModalType, toggleModal } from '../../../store/modalsSlice';
import { addStore } from '../../../store/storeSlice';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import clsx from 'clsx';

import { IRequestStore } from './types';

const ModalStores = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);

  const { store } = useAppSelector((state) => state.store);
  const { info } = store;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestStore>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestStore> = (data: IRequestStore) => {
    const requestData = {
      ...data,
    };

    dispatch(addStore(requestData));

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(toggleModal({ action: false, type }))}>
      <ModalOverlay />
      <ModalContent marginTop={200} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>
            {type === ModalType.STORES && 'Добавить магазин'}
            {type === ModalType.EDIT_STORES && 'Редактировать магазин'}
          </h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={style.modalLabel}>
              <InputText
                defaultValue={type === ModalType.EDIT_STORES ? info.name : undefined}
                error={errors.name}
                view="text"
                placeholder="Наименование"
                style={{ width: '300px' }}
                {...register('name', {
                  required: true,
                  maxLength: { value: 20, message: 'Не более 20 символов' },
                })}
              />
            </label>
            <label className={style.modalLabel}>
              <InputText
                error={errors.token_bot}
                view="text"
                style={{ width: '300px' }}
                placeholder="Telegram-токен бота"
                {...register('token_bot')}
              />
            </label>
            <label className={style.modalLabel}>
              <InputText
                error={errors.link_bot}
                view="text"
                placeholder="Ссылка на бота"
                style={{ width: '300px' }}
                {...register('link_bot')}
              />
            </label>
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                {type === ModalType.STORES && 'Добавить'}
                {type === ModalType.EDIT_STORES && 'Редактировать'}
              </Button>
              <Button
                view="delete"
                style={{ fontSize: '20px' }}
                onClick={() => dispatch(toggleModal({ action: false, type }))}
              >
                Закрыть
              </Button>
            </div>
            {type === ModalType.STORES && <Instruction />}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalStores };
