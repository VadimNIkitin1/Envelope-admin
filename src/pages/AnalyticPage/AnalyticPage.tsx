import Table from '../../widgets/Table/Table';

import { analytic } from '../../assets/db';
import style from './AnalyticPage.module.scss';
import React from 'react';
import { useAppSelector } from '../../types/hooks';

const AnalyticPage = () => {
  const tableHeaderAnalytic = useAppSelector((state) => state.tableHeader.tableHeaderAnalytic);
  return (
    <div className={style.AnalyticPage}>
      <Table data={analytic} tableHeader={tableHeaderAnalytic} />
    </div>
  );
};

export default AnalyticPage;
