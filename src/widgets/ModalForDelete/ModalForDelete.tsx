import { useLocation } from 'react-router-dom';

import { triggerRender } from '../../store/activeSlice';
import { toggleModalForDelete } from '../../store/modalsSlice';
import { deleteCategory } from '../../store/categorySlice';
import { deleteProduct } from '../../store/productSlice';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import Button from '../../shared/Button/Button';

import style from './ModalForDelete.module.scss';

const ModalForDelete = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const category = useAppSelector((state) => state.categories.category);
  const product = useAppSelector((state) => state.products.product);
  const company_id = useAppSelector((state) => state.auth.company_id);

  const handleDelete = () => {
    if (location.pathname === `/${company_id}/categories`) {
      dispatch(deleteCategory(category.id));
    }

    if (location.pathname === `/${company_id}/menu`) {
      dispatch(deleteProduct(product.id));
    }

    dispatch(toggleModalForDelete(false));
    dispatch(triggerRender());
  };

  return (
    <div className={style.wrapper} onClick={() => dispatch(toggleModalForDelete(false))}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>
          {location.pathname === `/${company_id}/menu` &&
            `Вы действительно хотите удалить ${product.name_rus} ?`}
          {location.pathname === `/${company_id}/categories` &&
            `Вы действительно хотите удалить ${category.name_rus} ?`}
        </h1>
        <div style={{ display: 'flex', columnGap: '20px' }}>
          <Button view="add" onClick={() => handleDelete()}>
            Да
          </Button>
          <Button view="delete" onClick={() => dispatch(toggleModalForDelete(false))}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalForDelete;
