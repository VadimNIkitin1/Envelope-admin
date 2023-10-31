import Table from '../../widgets/Table/Table';
import { settings } from '../../assets/db';
import style from './SettingsPage.module.scss';

import React from 'react';
import { useAppSelector } from '../../types/hooks';

const SettingsPage = () => {
  const tableHeaderSettings = useAppSelector((state) => state.tableHeader.tableHeaderSettings);
  return (
    <div className={style.SettingsPage}>
      <Table data={settings} tableHeader={tableHeaderSettings} />
    </div>
  );
};

export default SettingsPage;
