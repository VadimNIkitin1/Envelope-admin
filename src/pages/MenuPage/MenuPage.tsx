import { useEffect } from 'react';

import { BsFillPlusSquareFill } from 'react-icons/bs';

import { toggleModalProducts } from '../../store/modalsSlice';
import { getProducts } from '../../store/productSlice';

import Table from '../../widgets/Table/Table';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import ModalEditProducts from '../../widgets/ModalEditProducts/ModalEditProducts';

import Button from '../../shared/Button/Button';

import style from './MenuPage.module.scss';
import ModalForDelete from '../../widgets/ModalForDelete/ModalForDelete';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const modalProducts = useAppSelector((state) => state.modals.modalProducts);
  const render = useAppSelector((state) => state.active.render);
  const modalEditProducts = useAppSelector((state) => state.modals.modalEditProducts);
  const tableHeaderMenu = useAppSelector((state) => state.tableHeader.tableHeaderMenu);
  const modalForDelete = useAppSelector((state) => state.modals.modalForDelete);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  }, [render]);

  return (
    <div className={style.MenuPage}>
      <div style={{ display: 'flex' }}>
        <Button view={'add'} onClick={() => dispatch(toggleModalProducts(true))}>
          Добавить продукт <BsFillPlusSquareFill />
        </Button>
      </div>
      <Table data={products} tableHeader={tableHeaderMenu} />
      {modalProducts && <ModalProducts />}
      {modalEditProducts && <ModalEditProducts />}
      {modalForDelete && <ModalForDelete />}
    </div>
  );
};

export default MenuPage;
