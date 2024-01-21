import { FC, useEffect } from 'react';
import { useParams } from 'react-router';

import { getCategories, getAllCategoriesProperties } from '@/store/categorySlice';
import { ModalType, getAllModalsProperties } from '@/store/modalsSlice';
import { getAllActiveProperties } from '@/store/activeSlice';

import { TABLE_HEADER_CATEGORIES } from './data';

import { ModalCategories } from '@/widgets/Modals/ModalCategories';
import { ModalDelete } from '@/widgets/Modals/ModalDelete';
import { Table } from '@/widgets/Table';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import style from './CategoriesPage.module.scss';

const CategoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const { render } = useAppSelector((state) => getAllActiveProperties(state));
  const { categories } = useAppSelector((state) => getAllCategoriesProperties(state));
  const { modalCategories, modalEditCategories, modalForDelete } = useAppSelector((state) =>
    getAllModalsProperties(state)
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories(store_id));
    }, 300);
  }, [render]);

  return (
    <div className={style.page}>
      <div className={style.table}>
        <Table data={categories} tableHeader={TABLE_HEADER_CATEGORIES} />
      </div>

      {modalCategories && <ModalCategories isOpen={modalCategories} type={ModalType.CATEGORIES} />}
      {modalEditCategories && (
        <ModalCategories isOpen={modalEditCategories} type={ModalType.EDIT_CATEGORIES} />
      )}
      {modalForDelete && <ModalDelete isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export { CategoriesPage };
