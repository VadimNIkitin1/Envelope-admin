import { useLocation } from 'react-router-dom';
import { MdOutlineEditCalendar, MdDeleteForever } from 'react-icons/md';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import { saveCategory, toggleCheckboxCategory } from '../../store/categorySlice';
import { saveProduct, toggleCheckboxProduct } from '../../store/productSlice';
import {
  toggleModalEditCategories,
  toggleModalEditProducts,
  toggleModalForDelete,
} from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';

import Checkbox from '../../shared/Checkbox/Checkbox';
import Button from '../../shared/Button/Button';

import { clsx } from 'clsx';
import style from './TableRow.module.scss';
import { IColumnTable } from '../../types/tableHeaders';

import { FC } from 'react';

import { TDataForTable } from '../../types/data';

interface Props {
  cell: TDataForTable;
  tableHeader: IColumnTable[];
}

const TableRow: FC<Props> = ({ cell, tableHeader }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.active.theme);
  const company_id = useAppSelector((state) => state.auth.company_id);

  const handleEdit = (data: any) => {
    if (location.pathname === `/${company_id}/menu`) {
      dispatch(saveProduct(data));
      dispatch(toggleModalEditProducts(true));
    }

    if (location.pathname === `/${company_id}/categories`) {
      dispatch(saveCategory(data));
      dispatch(toggleModalEditCategories(true));
    }
  };

  const handleDelete = (data: any) => {
    if (location.pathname === `/${company_id}/menu`) {
      dispatch(saveProduct(data));
    }

    if (location.pathname === `/${company_id}/categories`) {
      dispatch(saveCategory(data));
    }

    dispatch(toggleModalForDelete(true));
  };

  const handleCheckbox = (id: string | number, code: string) => {
    if (location.pathname === `/${company_id}/menu`) {
      dispatch(toggleCheckboxProduct({ id, code }));
    }

    if (location.pathname === `/${company_id}/categories`) {
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
              <Checkbox
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
      {location.pathname === `/${company_id}/categories` ? (
        <>
          <Button view="edit" onClick={() => handleEdit(cell)}>
            <MdOutlineEditCalendar />
          </Button>
          <Button view="delete" onClick={() => handleDelete(cell)}>
            <MdDeleteForever />
          </Button>
        </>
      ) : null}
      {location.pathname === `/${company_id}/menu` ? (
        <>
          <Button view="edit" onClick={() => handleEdit(cell)}>
            <MdOutlineEditCalendar />
          </Button>
          <Button view="delete" onClick={() => handleDelete(cell)}>
            <MdDeleteForever />
          </Button>
        </>
      ) : null}
      {location.pathname === `/${company_id}/settings` ? (
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
