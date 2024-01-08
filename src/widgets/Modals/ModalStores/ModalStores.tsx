import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Instruction } from '@/widgets/Instruction';
import { ModalWindow } from '@/entities/ModalWindow';
import { InputText } from '@/shared/InputText';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '@/store/activeSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';
import { addStore } from '@/store/storeSlice';

import { IRequestStore } from './types';

import style from './ModalStores.module.scss';

const ModalStores = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();

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
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={'Создать магазин'}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <Instruction />
    </ModalWindow>
  );
};

export { ModalStores };
