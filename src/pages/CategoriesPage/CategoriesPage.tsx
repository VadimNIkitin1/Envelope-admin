import { FC, useEffect } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { Alert, Skeleton } from '@mui/material';

import { getCategories } from '../../store/categorySlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { TABLE_HEADER_CATEGORIES } from './CategoriesPage.data';

import { ModalCategories } from '../../widgets/ModalCategories/ModalCategories';

import Table from '../../widgets/Table/Table';

import Button from '../../shared/Button/Button';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './CategoriesPage.module.scss';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const [store_id] = useLocalStorage('store_id', '');

  const render = useAppSelector((state) => state.active.render);

  const modalCategories = useAppSelector((state) => state.modals.modalCategories);

  const modalEditCategories = useAppSelector((state) => state.modals.modalEditCategories);
  const modalForDelete = useAppSelector((state) => state.modals.modalForDelete);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories(store_id));
    }, 200);
  }, [render]);

  return (
    <div className={style.page}>
      <div className={style.button}>
        <Button
          view="add"
          onClick={() => dispatch(toggleModal({ action: true, type: ModalType.CATEGORIES }))}
        >
          Добавить категорию <BsFillPlusSquareFill />
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
          <Table data={categories} tableHeader={TABLE_HEADER_CATEGORIES} />
        </div>
      )}
      {error && <Alert severity="error">Ошибка!!!</Alert>}
      {modalCategories && <ModalCategories type={ModalType.CATEGORIES} />}
      {modalEditCategories && <ModalCategories type={ModalType.EDIT_CATEGORIES} />}
      {modalForDelete && <ModalCategories type={ModalType.DELETE} />}
    </div>
  );
};

export default CategoriesPage;
