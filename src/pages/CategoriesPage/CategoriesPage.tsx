import { FC, useEffect } from 'react';

import { AlertIcon, AlertTitle, Alert } from '@chakra-ui/react';

import { getCategories } from '../../store/categorySlice';
import { ModalType } from '../../store/modalsSlice';
import { TABLE_HEADER_CATEGORIES } from './CategoriesPage.data';

import { ModalCategories } from '../../widgets/Modals/ModalCategories/ModalCategories';
import { ModalDelete } from '../../widgets/Modals/ModalDelete/ModalDelete';

import Table from '../../widgets/Table/Table';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './CategoriesPage.module.scss';
import { useParams } from 'react-router';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { render } = useAppSelector((state) => state.active);

  const { categories, error } = useAppSelector((state) => state.categories);

  const { modalCategories, modalEditCategories, modalForDelete } = useAppSelector(
    (state) => state.modals
  );

  console.log(render);

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
      {modalCategories && <ModalCategories isOpen={modalCategories} type={ModalType.CATEGORIES} />}
      {modalEditCategories && (
        <ModalCategories isOpen={modalEditCategories} type={ModalType.EDIT_CATEGORIES} />
      )}
      {modalForDelete && <ModalDelete isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default CategoriesPage;
