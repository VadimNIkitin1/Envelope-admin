import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../shared/InputText/InputText';
import { Instruction } from '../Instruction/Instruction';

import style from './Modal.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { toggleRecipient, triggerRender } from '../../store/activeSlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { addCategory, deleteCategoryFlag, editCategory } from '../../store/categorySlice';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { addStore } from '../../store/storeSlice';
import { useLocation } from 'react-router';
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

const Modals = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { category } = useAppSelector((state) => state.categories);
  const product = useAppSelector((state) => state.products.product);
  const theme = useAppSelector((state) => state.active.theme);
  const recipient = useAppSelector((state) => state.active.recipient);
  const store_id = localStorage.getItem('store_id');
  const { name, id } = category;

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

    if (type === ModalType.STORES) {
      const requestData = {
        ...data,
      };

      dispatch(addStore(requestData));
    }

    if (type === ModalType.DELETE) {
      if (location.pathname.includes(PATHNAME.CATEGORIES)) {
        dispatch(deleteCategoryFlag(category.id));
      }

      if (location.pathname.includes(PATHNAME.PRODUCTS)) {
        dispatch(deleteProductFlag(product.id));
      }
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(toggleModal({ action: false, type }))}>
      <ModalOverlay />
      <ModalContent marginTop={200} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)} padding={5}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>
            {type === ModalType.CATEGORIES && 'Добавить категорию'}
            {type === ModalType.EDIT_CATEGORIES && 'Редактировать категорию'}
            {type === ModalType.STORES && 'Добавить магазин'}
            {type === ModalType.RECIPIENT && 'Выберите получателей'}
            {type === ModalType.DELETE &&
              location.pathname.includes(PATHNAME.PRODUCTS) &&
              `Вы действительно хотите удалить ${product.name} ?`}
            {type === ModalType.DELETE &&
              location.pathname.includes(PATHNAME.CATEGORIES) &&
              `Вы действительно хотите удалить ${category.name} ?`}
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
            {type === ModalType.STORES && (
              <>
                <label className={style.modalLabel}>
                  <InputText
                    defaultValue={type === ModalType.EDIT_CATEGORIES ? name : undefined}
                    error={errors.token_bot}
                    view="text"
                    style={{ width: '300px' }}
                    placeholder="Telegram-токен бота"
                    {...register('token_bot', {
                      required: true,
                    })}
                  />
                </label>
                <label className={style.modalLabel}>
                  <InputText
                    defaultValue={type === ModalType.EDIT_CATEGORIES ? name : undefined}
                    error={errors.link_bot}
                    view="text"
                    placeholder="Ссылка на бота"
                    style={{ width: '300px' }}
                    {...register('link_bot', {
                      required: true,
                    })}
                  />
                </label>
              </>
            )}
            {type === ModalType.CATEGORIES && (
              <label className={clsx(style.containerCheckbox, theme && style.light)}>
                В наличии
                <Checkbox {...register('availability')} />
              </label>
            )}
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                {type === ModalType.CATEGORIES || type === ModalType.STORES ? 'Добавить' : null}
                {type === ModalType.EDIT_CATEGORIES && 'Редактировать'}
                {type === ModalType.DELETE && 'Удалить'}
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

export { Modals };
