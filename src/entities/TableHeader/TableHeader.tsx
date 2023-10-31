import React from 'react';

import { useAppSelector } from '../../types/hooks';

import style from './TableHeader.module.scss';
import clsx from 'clsx';

const TableHeader = ({ tableHeader }) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={clsx(style.tableHeader, theme && style.light)}>
      {tableHeader.map((column) => (
        <p key={column.name} className={style.tableColumn}>
          {column.name}
        </p>
      ))}
    </div>
  );
};

export default TableHeader;
