import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '@/store/activeSlice/activeSlice';
import { toggleModal } from '@/store/modalsSlice';
import { editLegalInfo, getAllStoresProperties } from '@/store/storeSlice';

import { ModalWindow } from '@/entities/ModalWindow';
import { InputText } from '@/shared/InputText';

import type { IRequestLegalInfo } from './types';
import style from './ModalLegalInfo.module.scss';

const ModalLegalInfo = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { store } = useAppSelector((state) => getAllStoresProperties(state));
  const { legal_information } = store;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestLegalInfo>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestLegalInfo> = (data: IRequestLegalInfo) => {
    const requestData = {
      id: store_id,
      ...data,
    };

    dispatch(editLegalInfo(requestData));
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
          defaultValue={legal_information.full_organization_name}
          error={errors.full_organization_name}
          view="text"
          placeholder="Полное наименование организации"
          style={{ width: '300px' }}
          {...register('full_organization_name', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={legal_information.legal_adress}
          error={errors.legal_adress}
          view="text"
          placeholder="Юр адрес"
          style={{ width: '300px' }}
          {...register('legal_adress', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={legal_information.legal_number_phone}
          error={errors.legal_number_phone}
          view="number"
          placeholder="Юр телефон"
          style={{ width: '300px' }}
          {...register('legal_number_phone', {
            required: true,
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={legal_information.inn}
          error={errors.inn}
          view="number"
          placeholder="ИНН"
          style={{ width: '300px' }}
          {...register('inn', {
            required: true,
            maxLength: { value: 10, message: 'Не более 10 символов' },
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={legal_information.ogrn}
          error={errors.ogrn}
          view="number"
          placeholder="ОГРН"
          style={{ width: '300px' }}
          {...register('ogrn', {
            required: true,
            maxLength: { value: 13, message: 'Не более 13 символов' },
          })}
        />
      </label>
      <label className={style.modalLabel}>
        <InputText
          defaultValue={legal_information.postal_code}
          error={errors.postal_code}
          view="number"
          placeholder="Почтовый индекс"
          style={{ width: '300px' }}
          {...register('postal_code', {
            required: true,
            maxLength: { value: 6, message: 'Не более 6 символов' },
          })}
        />
      </label>
    </ModalWindow>
  );
};

export { ModalLegalInfo };
