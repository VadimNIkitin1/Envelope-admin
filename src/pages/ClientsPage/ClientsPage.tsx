import { clients } from '../../assets/db';
import Table from '../../widgets/Table/Table';
import { TABLE_HEADER_CLIENTS } from './ClientsPage.data';

const ClientsPage = () => {
  return <Table data={clients} tableHeader={TABLE_HEADER_CLIENTS} />;
};

export default ClientsPage;
