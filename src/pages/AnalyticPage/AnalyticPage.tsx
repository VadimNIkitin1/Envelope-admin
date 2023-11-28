import Table from '../../widgets/Table/Table';

import { analytic } from '../../assets/db';
import { TABLE_HEADER_ANALYTIC } from './AnalyticPage.data';

const AnalyticPage = ({ type }) => {
  console.log(type);
  return <Table data={analytic} tableHeader={TABLE_HEADER_ANALYTIC} />;
};

export default AnalyticPage;
