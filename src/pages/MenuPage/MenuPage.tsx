import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ModalType, getAllModalsProperties } from '@/store/modalsSlice';
import { getProducts, getAllProductsProperties } from '@/store/productSlice';
import { getAllActiveProperties } from '@/store/activeSlice';

import { Table } from '@/widgets/Table';
import { ModalProducts } from '@/widgets/Modals/ModalProducts';
import { ModalDelete } from '@/widgets/Modals/ModalDelete';

import { TABLE_HEADER_MENU } from './data';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import style from './MenuPage.module.scss';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { products } = useAppSelector((state) => getAllProductsProperties(state));
  const { render } = useAppSelector((state) => getAllActiveProperties(state));
  const { modalProducts, modalEditProducts, modalForDelete } = useAppSelector((state) =>
    getAllModalsProperties(state)
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
      {modalProducts && <ModalProducts isOpen={modalProducts} type={ModalType.PRODUCTS} />}
      {modalEditProducts && (
        <ModalProducts isOpen={modalEditProducts} type={ModalType.EDIT_PRODUCTS} />
      )}
      {modalForDelete && <ModalDelete isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export { MenuPage };
