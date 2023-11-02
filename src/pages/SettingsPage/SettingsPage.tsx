import Table from '../../widgets/Table/Table';
import { settings } from '../../assets/db';

import { useAppSelector } from '../../types/hooks';

const SettingsPage = () => {
  const tableHeaderSettings = useAppSelector((state) => state.tableHeader.tableHeaderSettings);
  return <Table data={settings} tableHeader={tableHeaderSettings} />;
};

export default SettingsPage;
