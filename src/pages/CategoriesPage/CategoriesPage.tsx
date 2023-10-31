import { FC, useEffect } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { getCategories } from '../../store/categorySlice';
import { toggleModalCategories } from '../../store/modalsSlice';

import ModalCategories from '../../widgets/ModalCategories/ModalCategories';
import ModalEditCategories from '../../widgets/ModalEditCategories/ModalEditCategories';
import ModalForDelete from '../../widgets/ModalForDelete/ModalForDelete';

import Table from '../../widgets/Table/Table';

import Button from '../../shared/Button/Button';

import style from './CategoriesPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const render = useAppSelector((state) => state.active.render);

  const modalCategories = useAppSelector((state) => state.modals.modalCategories);

  const modalEditCategories = useAppSelector((state) => state.modals.modalEditCategories);
  const modalForDelete = useAppSelector((state) => state.modals.modalForDelete);
  // const modalError = useAppSelector((state) => state.modals.modalError);

  const tableHeaderCategories = useAppSelector((state) => state.tableHeader.tableHeaderCategories);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories());
    }, 200);
  }, [render]);

  return (
    <div className={style.page}>
      <Button view="add" onClick={() => dispatch(toggleModalCategories(true))}>
        Добавить категорию <BsFillPlusSquareFill />
      </Button>
      <Table data={categories} tableHeader={tableHeaderCategories} />
      {modalCategories && <ModalCategories />}
      {modalEditCategories && <ModalEditCategories />}
      {modalForDelete && <ModalForDelete />}
    </div>
  );
};

export default CategoriesPage;
