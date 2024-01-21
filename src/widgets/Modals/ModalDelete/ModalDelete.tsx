import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { triggerRender } from '@/store/activeSlice/activeSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';
import { deleteCategoryFlag } from '@/store/categorySlice/categorySlice';
import { deleteProductFlag } from '@/store/productSlice/productSlice';
import { deleteStore } from '@/store/storeSlice';

import { ModalWindow } from '@/entities/ModalWindow';
import { Checkbox } from '@/shared/Checkbox';

import { PATHNAME } from '@/app/constants';
import { getAllCategoriesProperties } from '@/store/categorySlice';
import { getAllProductsProperties } from '@/store/productSlice';

const ModalDelete = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { store_id } = useParams();

  const { category } = useAppSelector((state) => getAllCategoriesProperties(state));
  const { product } = useAppSelector((state) => getAllProductsProperties(state));

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(deleteCategoryFlag(category.id));
    }

    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(deleteProductFlag(product.id));
    }

    if (location.pathname.includes(PATHNAME.STORES)) {
      dispatch(deleteStore(store_id));
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  let title = '';
  if (location.pathname.includes(PATHNAME.PRODUCTS)) {
    title = `Вы действительно хотите удалить ${product.name} ?`;
  } else if (location.pathname.includes(PATHNAME.CATEGORIES)) {
    title = `Вы действительно хотите удалить ${category.name} ?`;
  } else if (location.pathname.includes(PATHNAME.STORES)) {
    title = `Вы действительно хотите удалить магазин ?`;
  }

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      type={ModalType.DELETE}
    >
      <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px' }}>
        <Checkbox {...register('shure', { required: true })} />Я действительно хочу удалить
      </div>
    </ModalWindow>
  );
};

export { ModalDelete };
