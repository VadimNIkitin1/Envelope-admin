import { clients } from '../../assets/db';
import Table from '../../widgets/Table/Table';
import style from './ClientsPage.module.scss';
import { useAppSelector } from '../../types/hooks';

const ClientsPage = () => {
  const tableHeaderClients = useAppSelector((state) => state.tableHeader.tableHeaderClients);
  return (
    <div className={style.ClientsPage}>
      <Table data={clients} tableHeader={tableHeaderClients} />
    </div>
  );
};

export default ClientsPage;
