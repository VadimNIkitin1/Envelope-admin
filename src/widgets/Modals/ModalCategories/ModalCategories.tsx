import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '../../../store/activeSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';
import { addCategory, editCategory } from '@/store/categorySlice';

import { ModalWindow } from '@/entities/ModalWindow/ModalWindow';
import { InputText } from '@/shared/InputText/InputText';
import { Checkbox } from '@/shared/Checkbox/Checkbox';

import type { IRequestCategory } from './types';
import clsx from 'clsx';
import style from './ModalCategories.module.scss';

const ModalCategories = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();

  const { store_id } = useParams();

  const { category } = useAppSelector((state) => state.categories);
  const { name, id } = category;

  const { theme } = useAppSelector((state) => state.active);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    if (type === ModalType.CATEGORIES) {
      const requestData = {
        id: store_id,
        ...data,
      };
      dispatch(addCategory(requestData));
    }

    if (type === ModalType.EDIT_CATEGORIES) {
      const requestData = {
        id,
        ...data,
      };
      dispatch(editCategory(requestData));
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={type === ModalType.CATEGORIES ? 'Добавить категорию' : 'Редактировать категорию'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className={style.modalLabel}>
        <InputText
          defaultValue={type === ModalType.EDIT_CATEGORIES ? name : undefined}
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
      {type === ModalType.CATEGORIES && (
        <label className={clsx(style.containerCheckbox, theme && style.light)}>
          В наличии
          <Checkbox {...register('availability')} />
        </label>
      )}
    </ModalWindow>
  );
};

export { ModalCategories };
