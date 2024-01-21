import { FC } from 'react';
import { useLocation } from 'react-router';
import { Tooltip } from '@chakra-ui/react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { IColumnTable } from '@/types/tableHeaders';

import { PATHNAME } from '@/app/constants';

import { Button } from '@/shared/Button';

import { ModalType, toggleModal } from '@/store/modalsSlice';
import { getAllActiveProperties } from '@/store/activeSlice/selectors';

import { clsx } from 'clsx';
import style from './TableHeader.module.scss';
interface Props {
  tableHeader: IColumnTable[];
}

const TableHeader: FC<Props> = ({ tableHeader }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

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
