import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../shared/InputText/InputText';

import style from './Modal.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { toggleRecipient, triggerRender } from '../../store/activeSlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { addCategory, deleteCategoryFlag, editCategory } from '../../store/categorySlice';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { useLocation, useParams } from 'react-router';
import { deleteProductFlag } from '../../store/productSlice';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { PATHNAME } from '../../app/constants';
import clsx from 'clsx';
import { deleteStore } from '../../store/storeSlice';

const Modals = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { store_id } = useParams();
  const { idStoreForDelete } = useAppSelector((state) => state.store);

  const { category } = useAppSelector((state) => state.categories);
  const { name, id } = category;

  const { product } = useAppSelector((state) => state.products);

  const { theme, recipient } = useAppSelector((state) => state.active);

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

    if (type === ModalType.DELETE) {
      if (location.pathname.includes(PATHNAME.CATEGORIES)) {
        dispatch(deleteCategoryFlag(category.id));
      }

      if (location.pathname.includes(PATHNAME.PRODUCTS)) {
        dispatch(deleteProductFlag(product.id));
      }

      if (location.pathname.includes(PATHNAME.STORES)) {
        localStorage.removeItem('store_id');
        dispatch(deleteStore(idStoreForDelete));
      }
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  const handleCloseModal = () => {
    localStorage.removeItem('store_id');
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
            {type === ModalType.DELETE &&
              location.pathname.includes(PATHNAME.PRODUCTS) &&
              `Вы действительно хотите удалить ${product.name} ?`}
            {type === ModalType.DELETE &&
              location.pathname.includes(PATHNAME.CATEGORIES) &&
              `Вы действительно хотите удалить ${category.name} ?`}
            {type === ModalType.DELETE &&
              location.pathname.includes(PATHNAME.STORES) &&
              `Вы действительно хотите удалить магазин ?`}
          </h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
            {type === ModalType.RECIPIENT && (
              <RadioGroup
                onChange={(e) => dispatch(toggleRecipient(e))}
                value={recipient}
                marginBottom={'20px'}
              >
                <Stack direction="column">
                  <Radio value="all">Всем</Radio>
                  <Radio value="without_order">Кто еще не заказывал</Radio>
                  <Radio value="with_order">Кто уже заказывал</Radio>
                  <Radio value="is_premium">С премимум подпиской TG</Radio>
                </Stack>
              </RadioGroup>
            )}
            {type !== ModalType.DELETE && type !== ModalType.RECIPIENT && (
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
            )}
            {type === ModalType.CATEGORIES && (
              <label className={clsx(style.containerCheckbox, theme && style.light)}>
                В наличии
                <Checkbox {...register('availability')} />
              </label>
            )}
            {type === ModalType.DELETE && (
              <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px' }}>
                <Checkbox {...register('shure', { required: true })} />Я действительно хочу удалить
              </div>
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
                {type === ModalType.DELETE && 'Удалить'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { Modals };
