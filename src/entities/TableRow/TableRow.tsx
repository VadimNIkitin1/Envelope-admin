import { useLocation } from 'react-router-dom';
import { MdOutlineEditCalendar, MdDeleteForever } from 'react-icons/md';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import { saveCategory, toggleCheckboxCategory } from '../../store/categorySlice';
import { saveProduct, toggleCheckboxProduct } from '../../store/productSlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';

import { TableCheckbox } from '../../shared/TableCheckbox/TableCheckbox';
import Button from '../../shared/Button/Button';

import { clsx } from 'clsx';
import style from './TableRow.module.scss';
import { IColumnTable } from '../../types/tableHeaders';

import { FC } from 'react';

import { TDataForTable } from '../../types/data';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
import { Tooltip } from '@mui/material';

interface Props {
  cell: TDataForTable;
  tableHeader: IColumnTable[];
}

const TableRow: FC<Props> = ({ cell, tableHeader }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.active.theme);
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');

  const handleEdit = (data: any) => {
    if (location.pathname === `/${company_id}/${store_id}/menu`) {
      dispatch(saveProduct(data));
      dispatch(toggleModal({ action: true, type: ModalType.EDIT_PRODUCTS }));
    }

    if (location.pathname === `/${company_id}/${store_id}/categories`) {
      dispatch(saveCategory(data));
      dispatch(toggleModal({ action: true, type: ModalType.EDIT_CATEGORIES }));
    }
  };

  const handleDelete = (data: any) => {
    if (location.pathname === `/${company_id}/${store_id}/menu`) {
      dispatch(saveProduct(data));
    }

    if (location.pathname === `/${company_id}/${store_id}/categories`) {
      dispatch(saveCategory(data));
    }

    dispatch(toggleModal({ action: true, type: ModalType.DELETE }));
  };

  const handleCheckbox = (id: string | number, code: string) => {
    if (location.pathname === `/${company_id}/${store_id}/menu`) {
      dispatch(toggleCheckboxProduct({ id, code }));
    }

    if (location.pathname === `/${company_id}/${store_id}/categories`) {
      dispatch(toggleCheckboxCategory({ id, code }));
    }

    dispatch(triggerRender());
  };

  return (
    <div className={clsx(style.tableRow, theme && style.light)}>
      {tableHeader.map((column: IColumnTable) => {
        switch (column.type) {
          case 'checkbox':
            return (
              <TableCheckbox
                key={column.name}
                checked={cell[column.code]}
                className={style.tableColumn}
                onChange={() => handleCheckbox(cell.id, column.code)}
              />
            );
          default:
            return (
              <p key={column.name} className={style.tableColumn}>
                {cell[column.code]}
              </p>
            );
            break;
        }
      })}
      {location.pathname === `/${company_id}/${store_id}/categories` ||
      location.pathname === `/${company_id}/${store_id}/menu` ? (
        <>
          <Tooltip title="Редактировать" placement="top">
            <span>
              <Button view="edit" onClick={() => handleEdit(cell)}>
                <MdOutlineEditCalendar />
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Удалить" placement="top">
            <span>
              <Button view="delete" onClick={() => handleDelete(cell)}>
                <MdDeleteForever />
              </Button>
            </span>
          </Tooltip>
        </>
      ) : null}
      {location.pathname === `/${company_id}/${store_id}/settings` ? (
        <>
          <Button view="edit">
            <MdOutlineEditCalendar />
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default TableRow;
