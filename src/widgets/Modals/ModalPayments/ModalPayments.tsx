import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { InputText } from '../../../shared/InputText/InputText';
import type { IRequestPayments } from './types';
import style from './ModalPayments.module.scss';
import Button from '../../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { triggerRender } from '../../../store/activeSlice';
import { toggleModal } from '../../../store/modalsSlice';
import { useParams } from 'react-router';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import clsx from 'clsx';
import { editPayments } from '../../../store/storeSlice';

const ModalPayments = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const { store } = useAppSelector((state) => state.store);
  const { payments } = store;
  const { theme } = useAppSelector((state) => state.active);

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

  const handleCloseModal = () => {
    dispatch(toggleModal({ action: false, type }));
    dispatch(triggerRender());
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(toggleModal({ action: false, type }))}>
      <ModalOverlay />
      <ModalContent marginTop={200} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>Редактировать</h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
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
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button
                view="delete"
                style={{ fontSize: '20px', color: '#fff' }}
                onClick={() => handleCloseModal()}
              >
                Закрыть
              </Button>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                Редактировать
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalPayments };
