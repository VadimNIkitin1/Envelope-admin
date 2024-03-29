import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '@/store/activeSlice/activeSlice';
import { toggleModal } from '@/store/modalsSlice';
import { editPayments, getAllStoresProperties } from '@/store/storeSlice';

import { ModalWindow } from '@/entities/ModalWindow';
import { InputText } from '@/shared/InputText';

import type { IRequestPayments } from './types';
import style from './ModalPayments.module.scss';

const ModalPayments = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { store } = useAppSelector((state) => getAllStoresProperties(state));
  const { payments } = store;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestPayments>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestPayments> = (data: IRequestPayments) => {
    const requestData = {
      id: store_id,
      ...data,
    };

    dispatch(editPayments(requestData));
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
          defaultValue={payments.min_order_amount_for_free_delivery}
          error={errors.min_order_amount_for_free_delivery}
          view="number"
          placeholder="Минимальная сумма заказа для бесплатной доставки"
          style={{ width: '450px' }}
          {...register('min_order_amount_for_free_delivery', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={payments.min_delivery_amount}
          error={errors.min_delivery_amount}
          view="number"
          placeholder="Минимальная сумма доставки"
          style={{ width: '300px' }}
          {...register('min_delivery_amount', {
            required: true,
          })}
        />
      </label>
    </ModalWindow>
  );
};

export { ModalPayments };
