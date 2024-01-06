import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '@/store/activeSlice';
import { toggleModal } from '@/store/modalsSlice';
import { editChats } from '@/store/storeSlice';

import { ModalWindow } from '@/entities/ModalWindow/ModalWindow';
import { InputText } from '@/shared/InputText/InputText';
import { InputFile } from '@/shared/InputFile/InputFile';

import type { IRequestChats } from './types';
import style from './ModalChats.module.scss';

const ModalChats = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const { store, image_welcome } = useAppSelector((state) => state.store);
  const { service_text_and_chats } = store;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestChats>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestChats> = (data: IRequestChats) => {
    const requestData = {
      id: store_id,
      ...data,
      welcome_image: image_welcome,
    };

    dispatch(editChats(requestData));
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={'Редактировать'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.email}
          error={errors.email}
          view="text"
          placeholder="Служебная почта"
          style={{ width: '300px' }}
          {...register('email', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.welcome_message_bot}
          error={errors.welcome_message_bot}
          view="text"
          placeholder="Приветственное сообщение бота"
          style={{ width: '300px' }}
          {...register('welcome_message_bot', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.delivery_chat}
          error={errors.delivery_chat}
          view="number"
          placeholder="Чат доставки"
          style={{ width: '300px' }}
          {...register('delivery_chat', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.order_chat}
          error={errors.order_chat}
          view="number"
          placeholder="Чат заказов"
          style={{ width: '300px' }}
          {...register('order_chat', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.completed_orders_chat}
          error={errors.completed_orders_chat}
          view="number"
          placeholder="Чат выполненых заказов"
          style={{ width: '300px' }}
          {...register('completed_orders_chat', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={service_text_and_chats.canceled_orders_chat}
          error={errors.canceled_orders_chat}
          view="number"
          placeholder="Чат отмененных заказов"
          style={{ width: '300px' }}
          {...register('canceled_orders_chat', {
            required: true,
          })}
        />
      </label>
      <InputFile
        type="welcome_image"
        {...register('welcome_image')}
        error={errors.welcome_image}
        style={{ width: '250px', height: '245px', objectFit: 'cover' }}
      />
    </ModalWindow>
  );
};

export { ModalChats };
