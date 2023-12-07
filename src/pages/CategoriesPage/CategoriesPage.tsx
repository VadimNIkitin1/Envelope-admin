import { FC, useEffect } from 'react';

import { AlertIcon, AlertTitle, Alert } from '@chakra-ui/react';

import { getCategories } from '../../store/categorySlice';
import { ModalType } from '../../store/modalsSlice';
import { TABLE_HEADER_CATEGORIES } from './CategoriesPage.data';

import { Modals } from '../../widgets/Modal/Modal';

import Table from '../../widgets/Table/Table';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './CategoriesPage.module.scss';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, error } = useAppSelector((state) => state.categories);
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
      <div className={style.table}>
        <Table data={categories} tableHeader={TABLE_HEADER_CATEGORIES} />
      </div>
      {error && (
        <Alert status="error" variant={'solid'} borderRadius={'10px'}>
          <AlertIcon />
          <AlertTitle>Ошибка!!!</AlertTitle>
        </Alert>
      )}
      {modalCategories && <Modals isOpen={modalCategories} type={ModalType.CATEGORIES} />}
      {modalEditCategories && (
        <Modals isOpen={modalEditCategories} type={ModalType.EDIT_CATEGORIES} />
      )}
      {modalForDelete && <Modals isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default CategoriesPage;
