import { FC, useEffect } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { AlertIcon, AlertTitle, Alert } from '@chakra-ui/react';

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
      <div className={style.button}>
        <Button
          view="add"
          onClick={() => dispatch(toggleModal({ action: true, type: ModalType.CATEGORIES }))}
        >
          Добавить категорию <BsFillPlusSquareFill />
        </Button>
      </div>
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
      {modalForDelete && <ModalCategories isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default CategoriesPage;
