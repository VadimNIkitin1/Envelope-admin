import { FC, useEffect } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { getCategories } from '../../store/categorySlice';
import { toggleModalCategories } from '../../store/modalsSlice';
import { TABLE_HEADER_CATEGORIES } from './CategoriesPage.data';

import { ModalCategories } from '../../widgets/ModalCategories/ModalCategories';
import ModalEditCategories from '../../widgets/ModalEditCategories/ModalEditCategories';
import ModalForDelete from '../../widgets/ModalForDelete/ModalForDelete';

import Table from '../../widgets/Table/Table';

import Button from '../../shared/Button/Button';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './CategoriesPage.module.scss';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const [store_id] = useLocalStorage('store_id', '');

  const render = useAppSelector((state) => state.active.render);

  const modalCategories = useAppSelector((state) => state.modals.modalCategories);

  const modalEditCategories = useAppSelector((state) => state.modals.modalEditCategories);
  const modalForDelete = useAppSelector((state) => state.modals.modalForDelete);
  // const modalError = useAppSelector((state) => state.modals.modalError);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories(store_id));
    }, 200);
  }, [render]);

  return (
    <div className={style.page}>
      <div className={style.button}>
        <Button view="add" onClick={() => dispatch(toggleModalCategories(true))}>
          Добавить категорию <BsFillPlusSquareFill />
        </Button>
      </div>
      <div className={style.table}>
        <Table data={categories} tableHeader={TABLE_HEADER_CATEGORIES} />
      </div>
      {modalCategories && <ModalCategories />}
      {modalEditCategories && <ModalEditCategories />}
      {modalForDelete && <ModalForDelete />}
    </div>
  );
};

export default CategoriesPage;
