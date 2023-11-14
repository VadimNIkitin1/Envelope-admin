import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { IColumnTable } from '../../types/tableHeaders';

import style from './TableHeader.module.scss';
import { clsx } from 'clsx';
import Button from '../../shared/Button/Button';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { Tooltip } from '@chakra-ui/react';
import { useLocation } from 'react-router';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

interface Props {
  tableHeader: IColumnTable[];
}

const TableHeader: FC<Props> = ({ tableHeader }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [company_id] = useLocalStorage('company_id', '');
  const store_id = localStorage.getItem('store_id');
  const theme = useAppSelector((state) => state.active.theme);

  const handleAdd = () => {
    if (location.pathname === `/${company_id}/${store_id}/menu`) {
      dispatch(toggleModal({ action: true, type: ModalType.PRODUCTS }));
    }

    if (location.pathname === `/${company_id}/${store_id}/categories`) {
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
      <Tooltip label="Добавить категорию">
        <span>
          <Button view="add" onClick={() => handleAdd()}>
            <BsFillPlusSquareFill />
          </Button>
        </span>
      </Tooltip>
    </div>
  );
};

export default TableHeader;
