import Table from '../../widgets/Table/Table';

import { analytic } from '../../assets/db';

import { useAppSelector } from '../../types/hooks';

const AnalyticPage = () => {
  const tableHeaderAnalytic = useAppSelector((state) => state.tableHeader.tableHeaderAnalytic);
  return <Table data={analytic} tableHeader={tableHeaderAnalytic} />;
};

export default AnalyticPage;
