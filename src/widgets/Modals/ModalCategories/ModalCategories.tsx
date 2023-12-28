import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../../shared/InputText/InputText';

import style from './ModalCategories.module.scss';
import Button from '../../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { triggerRender } from '../../../store/activeSlice';
import { ModalType, toggleModal } from '../../../store/modalsSlice';
import { addCategory, editCategory } from '../../../store/categorySlice';
import { Checkbox } from '../../../shared/Checkbox/Checkbox';
import { useParams } from 'react-router';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import clsx from 'clsx';

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

  const handleCloseModal = () => {
    dispatch(toggleModal({ action: false, type }));
    dispatch(triggerRender());
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(toggleModal({ action: false, type }))}>
      <ModalOverlay />
      <ModalContent marginTop={200} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>
            {type === ModalType.CATEGORIES && 'Добавить категорию'}
            {type === ModalType.EDIT_CATEGORIES && 'Редактировать категорию'}
            {type === ModalType.RECIPIENT && 'Выберите получателей'}
          </h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
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
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button
                view="delete"
                style={{ fontSize: '20px', color: '#fff' }}
                onClick={() => handleCloseModal()}
              >
                Закрыть
              </Button>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                {type === ModalType.CATEGORIES && 'Добавить'}
                {type === ModalType.EDIT_CATEGORIES && 'Редактировать'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalCategories };
