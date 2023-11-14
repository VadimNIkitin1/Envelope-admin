import { useEffect } from 'react';

import { ModalType } from '../../store/modalsSlice';
import { getProducts } from '../../store/productSlice';

import Table from '../../widgets/Table/Table';
import { ModalProducts } from '../../widgets/ModalProducts/ModalProducts';

import { TABLE_HEADER_MENU } from './ProductsPage.data';
import style from './ProductsPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { ModalCategories } from '../../widgets/Modal/Modal';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { products, error } = useAppSelector((state) => state.products);
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
      <div className={style.table}>
        <Table data={products} tableHeader={TABLE_HEADER_MENU} />
      </div>
      {error && (
        <Alert status="error" variant={'solid'} borderRadius={'10px'}>
          <AlertIcon />
          <AlertTitle>Ошибка!!!</AlertTitle>
        </Alert>
      )}
      {modalProducts && <ModalProducts isOpen={modalProducts} type={ModalType.PRODUCTS} />}
      {modalEditProducts && (
        <ModalProducts isOpen={modalEditProducts} type={ModalType.EDIT_PRODUCTS} />
      )}
      {modalForDelete && <ModalCategories isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default MenuPage;
