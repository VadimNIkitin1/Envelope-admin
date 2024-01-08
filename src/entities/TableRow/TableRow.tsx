import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react';
import { MdOutlineEditCalendar, MdDeleteForever } from 'react-icons/md';

import { useAppSelector, useAppDispatch } from '@/types/hooks';

import { PATHNAME } from '@/app/constants';

import { saveCategory, toggleCheckboxCategory } from '@/store/categorySlice';
import { saveProduct, toggleCheckboxProduct } from '@/store/productSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';
import { triggerRender } from '@/store/activeSlice';

import { TableCheckbox } from '@/shared/TableCheckbox';
import { Button } from '@/shared/Button';

import { IColumnTable } from '@/types/tableHeaders';

import { TDataForTable } from '@/types/data';

import { clsx } from 'clsx';
import style from './TableRow.module.scss';

interface Props {
  cell: TDataForTable;
  tableHeader: IColumnTable[];
}

const TableRow: FC<Props> = ({ cell, tableHeader }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.active.theme);

  const handleEdit = (data: any) => {
    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(saveProduct(data));
      dispatch(toggleModal({ action: true, type: ModalType.EDIT_PRODUCTS }));
    }

    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(saveCategory(data));
      dispatch(toggleModal({ action: true, type: ModalType.EDIT_CATEGORIES }));
    }
  };

  const handleDelete = (data: any) => {
    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(saveProduct(data));
    }

    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(saveCategory(data));
    }

    dispatch(toggleModal({ action: true, type: ModalType.DELETE }));
  };

  const handleCheckbox = (id: string | number, code: string) => {
    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(toggleCheckboxProduct({ id, code }));
    }

    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(toggleCheckboxCategory({ id, code }));
    }

    dispatch(triggerRender());
  };

  return (
    <div className={clsx(style.tableRow, theme && style.light)}>
      <div style={{ display: 'flex', columnGap: '20px' }}>
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

            case 'bool':
              return (
                <p key={column.name} className={style.tableColumn}>
                  {cell[column.code] ? '✅' : '❌'}
                </p>
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
      </div>
      {location.pathname.includes(PATHNAME.CATEGORIES) ||
      location.pathname.includes(PATHNAME.PRODUCTS) ? (
        <div style={{ display: 'flex', columnGap: '20px' }}>
          <Tooltip label="Редактировать" placement="top">
            <span>
              <Button view="add" onClick={() => handleEdit(cell)}>
                <MdOutlineEditCalendar />
              </Button>
            </span>
          </Tooltip>
          <Tooltip label="Удалить" placement="top">
            <span>
              <Button view="delete" onClick={() => handleDelete(cell)}>
                <MdDeleteForever />
              </Button>
            </span>
          </Tooltip>
        </div>
      ) : null}
      {location.pathname.includes(PATHNAME.SETTINGS) ? (
        <>
          <Button view="add">
            <MdOutlineEditCalendar />
          </Button>
        </>
      ) : null}
    </div>
  );
};

export { TableRow };
