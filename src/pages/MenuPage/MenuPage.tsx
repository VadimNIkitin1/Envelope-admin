import { useEffect } from 'react';

import { BsFillPlusSquareFill } from 'react-icons/bs';

import { toggleModal, ModalType } from '../../store/modalsSlice';
import { getProducts } from '../../store/productSlice';

import Table from '../../widgets/Table/Table';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';

import Button from '../../shared/Button/Button';

import { TABLE_HEADER_MENU } from './MenuPage.data';
import style from './MenuPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { ModalCategories } from '../../widgets/ModalCategories/ModalCategories';
import { Alert, Skeleton } from '@mui/material';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const modalProducts = useAppSelector((state) => state.modals.modalProducts);
  const render = useAppSelector((state) => state.active.render);
  const modalEditProducts = useAppSelector((state) => state.modals.modalEditProducts);
  const modalForDelete = useAppSelector((state) => state.modals.modalForDelete);
  const [store_id] = useLocalStorage('store_id', '');

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProducts(store_id));
    }, 200);
  }, [render]);

  return (
    <div className={style.page}>
      <div className={style.button}>
        <Button
          view={'add'}
          onClick={() => dispatch(toggleModal({ action: true, type: ModalType.PRODUCTS }))}
        >
          Добавить продукт <BsFillPlusSquareFill />
        </Button>
      </div>
      {loading ? (
        <>
          <Skeleton variant="text" height={45} />
          <Skeleton variant="rounded" height={75} />
          <Skeleton variant="rounded" height={75} />
          <Skeleton variant="rounded" height={75} />
        </>
      ) : (
        <div className={style.table}>
          <Table data={products} tableHeader={TABLE_HEADER_MENU} />
        </div>
      )}
      {error && <Alert severity="error">Ошибка!!!</Alert>}
      {modalProducts && <ModalProducts type={ModalType.PRODUCTS} />}
      {modalEditProducts && <ModalProducts type={ModalType.EDIT_PRODUCTS} />}
      {modalForDelete && <ModalCategories type={ModalType.DELETE} />}
    </div>
  );
};

export default MenuPage;
