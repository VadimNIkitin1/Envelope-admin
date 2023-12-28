import { useForm } from 'react-hook-form';
import style from './ModalDelete.module.scss';
import Button from '../../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { triggerRender } from '../../../store/activeSlice';
import { toggleModal } from '../../../store/modalsSlice';
import { deleteCategoryFlag } from '../../../store/categorySlice';
import { Checkbox } from '../../../shared/Checkbox/Checkbox';
import { useLocation } from 'react-router';
import { deleteProductFlag } from '../../../store/productSlice';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { PATHNAME } from '../../../app/constants';
import clsx from 'clsx';
import { deleteStore } from '../../../store/storeSlice';

const ModalDelete = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { idStoreForDelete } = useAppSelector((state) => state.store);

  const { category } = useAppSelector((state) => state.categories);
  const { product } = useAppSelector((state) => state.products);

  const { theme } = useAppSelector((state) => state.active);

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(deleteCategoryFlag(category.id));
    }

    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(deleteProductFlag(product.id));
    }

    if (location.pathname.includes(PATHNAME.STORES)) {
      dispatch(deleteStore(idStoreForDelete));
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
            {location.pathname.includes(PATHNAME.PRODUCTS) &&
              `Вы действительно хотите удалить ${product.name} ?`}
            {location.pathname.includes(PATHNAME.CATEGORIES) &&
              `Вы действительно хотите удалить ${category.name} ?`}
            {location.pathname.includes(PATHNAME.STORES) &&
              `Вы действительно хотите удалить магазин ?`}
          </h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px' }}>
              <Checkbox {...register('shure', { required: true })} />Я действительно хочу удалить
            </div>
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button
                view="delete"
                style={{ fontSize: '20px', color: '#fff' }}
                onClick={() => handleCloseModal()}
              >
                Закрыть
              </Button>
              <Button view="add" type="submit" style={{ fontSize: '20px' }}>
                Удалить
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalDelete };
