import { FC } from 'react';
import { useAppSelector } from '../../types/hooks';
import { IColumnTable } from '../../types/tableHeaders';

import style from './TableHeader.module.scss';
import { clsx } from 'clsx';

interface Props {
  tableHeader: IColumnTable[];
}

const TableHeader: FC<Props> = ({ tableHeader }) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={clsx(style.tableHeader, theme && style.light)}>
      {tableHeader.map((column: IColumnTable) => (
        <p key={column.name} className={style.tableColumn}>
          {column.name}
        </p>
      ))}
    </div>
  );
};

export default TableHeader;
