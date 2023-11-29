import { FC } from 'react';

import TableRow from '../../entities/TableRow/TableRow';
import TableHeader from '../../entities/TableHeader/TableHeader';

import { IColumnTable } from '../../types/tableHeaders';
import { TData } from '../../types/data';

import style from './Table.module.scss';
interface Props {
  data: TData;
  tableHeader: IColumnTable[];
}

const Table: FC<Props> = ({ data, tableHeader }) => {
  return (
    <>
      <TableHeader tableHeader={tableHeader} />
      {data === undefined || data.length === 0 ? (
        <div className={style.messageAddButton}>
          <p className={style.message}>Нет добавленых элементов</p>
        </div>
      ) : (
        data.map((cell, idx) => <TableRow key={idx} cell={cell} tableHeader={tableHeader} />)
      )}
    </>
  );
};

export default Table;
