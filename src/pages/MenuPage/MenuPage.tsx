import { useEffect } from 'react';

import { BsFillPlusSquareFill } from 'react-icons/bs';

import { toggleModalProducts } from '../../store/modalsSlice';
import { getProducts } from '../../store/productSlice';

import Table from '../../widgets/Table/Table';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import ModalEditProducts from '../../widgets/ModalEditProducts/ModalEditProducts';

import Button from '../../shared/Button/Button';

import ModalForDelete from '../../widgets/ModalForDelete/ModalForDelete';
import { TABLE_HEADER_MENU } from './MenuPage.data';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
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
    <>
      <div style={{ display: 'flex' }}>
        <Button view={'add'} onClick={() => dispatch(toggleModalProducts(true))}>
          Добавить продукт <BsFillPlusSquareFill />
        </Button>
      </div>
      <Table data={products} tableHeader={TABLE_HEADER_MENU} />
      {modalProducts && <ModalProducts />}
      {modalEditProducts && <ModalEditProducts />}
      {modalForDelete && <ModalForDelete />}
    </>
  );
};

export default MenuPage;
