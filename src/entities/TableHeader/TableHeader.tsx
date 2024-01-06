import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { IColumnTable } from '../../types/tableHeaders';

import style from './TableHeader.module.scss';
import { clsx } from 'clsx';
import { Button } from '../../shared/Button/Button';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { Tooltip } from '@chakra-ui/react';
import { useLocation } from 'react-router';
import { PATHNAME } from '../../app/constants';

interface Props {
  tableHeader: IColumnTable[];
}

const TableHeader: FC<Props> = ({ tableHeader }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);

  const handleAdd = () => {
    if (location.pathname.includes(PATHNAME.PRODUCTS)) {
      dispatch(toggleModal({ action: true, type: ModalType.PRODUCTS }));
    }

    if (location.pathname.includes(PATHNAME.CATEGORIES)) {
      dispatch(toggleModal({ action: true, type: ModalType.CATEGORIES }));
    }
  };

  return (
    <div className={clsx(style.tableHeader, theme && style.light)}>
      <div style={{ display: 'flex', columnGap: '20px' }}>
        {tableHeader.map((column: IColumnTable) => (
          <p key={column.name} className={style.tableColumn}>
            {column.name}
          </p>
        ))}
      </div>
      {location.pathname.includes(PATHNAME.CATEGORIES) ||
      location.pathname.includes(PATHNAME.PRODUCTS) ? (
        <Tooltip
          label={
            location.pathname.includes(PATHNAME.CATEGORIES)
              ? 'Добавить категорию'
              : location.pathname.includes(PATHNAME.PRODUCTS)
              ? 'Добавить продукт'
              : null
          }
        >
          <span>
            <Button view="add" onClick={() => handleAdd()}>
              <BsFillPlusSquareFill />
            </Button>
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
};

export { TableHeader };
