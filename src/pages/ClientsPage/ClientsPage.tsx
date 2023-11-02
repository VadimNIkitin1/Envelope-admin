import { clients } from '../../assets/db';
import Table from '../../widgets/Table/Table';

import { useAppSelector } from '../../types/hooks';

const ClientsPage = () => {
  const tableHeaderClients = useAppSelector((state) => state.tableHeader.tableHeaderClients);
  return <Table data={clients} tableHeader={tableHeaderClients} />;
};

export default ClientsPage;
