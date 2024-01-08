import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { toggleModal } from '@/store/modalsSlice';
import { triggerRender } from '@/store/activeSlice';
import { editInfo } from '@/store/storeSlice';

import { InputText } from '@/shared/InputText';
import { ModalWindow } from '@/entities/ModalWindow';

import { IRequestInfo } from './types';
import style from './ModalInfo.module.scss';

const ModalInfo = ({ isOpen, type }) => {
  const dispatch = useAppDispatch();
  const { name, number_phone, adress, link_bot, time_zone } = useAppSelector(
    (state) => state.store.store.info
  );
  const { store_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestInfo>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestInfo> = (data: IRequestInfo) => {
    const requestData = {
      id: store_id,
      ...data,
    };

    dispatch(editInfo(requestData));
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
          defaultValue={name}
          error={errors.name}
          view="text"
          placeholder="Название магазина"
          style={{ width: '450px' }}
          {...register('name', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={adress}
          error={errors.adress}
          view="text"
          placeholder="Адрес"
          style={{ width: '450px' }}
          {...register('adress', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={number_phone}
          error={errors.number_phone}
          view="number"
          placeholder="Номер телефона"
          style={{ width: '450px' }}
          {...register('number_phone', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={link_bot}
          error={errors.link_bot}
          view="text"
          placeholder="Ссылка на бота"
          style={{ width: '450px' }}
          {...register('link_bot', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={time_zone}
          error={errors.time_zone}
          view="text"
          placeholder="Часовой пояс"
          style={{ width: '450px' }}
          {...register('time_zone', {
            required: true,
          })}
        />
      </label>
    </ModalWindow>
  );
};

export { ModalInfo };
