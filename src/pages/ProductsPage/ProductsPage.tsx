import { useEffect } from 'react';

import { ModalType } from '../../store/modalsSlice';
import { getProducts } from '../../store/productSlice';

import Table from '../../widgets/Table/Table';
import { ModalProducts } from '../../widgets/ModalProducts/ModalProducts';

import { TABLE_HEADER_MENU } from './ProductsPage.data';
import style from './ProductsPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { Modals } from '../../widgets/Modal/Modal';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useParams } from 'react-router';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { products, error } = useAppSelector((state) => state.products);

  const { render } = useAppSelector((state) => state.active);

  const { modalProducts, modalEditProducts, modalForDelete } = useAppSelector(
    (state) => state.modals
  );

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
      {modalForDelete && <Modals isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default MenuPage;
