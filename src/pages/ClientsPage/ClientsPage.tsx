import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import Table from '../../widgets/Table/Table';
import { TABLE_HEADER_CLIENTS } from './ClientsPage.data';
import { getCustomers } from '../../store/reportSlice';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.report.customers);
  const [store_id] = useLocalStorage('store_id', '');

  useEffect(() => {
    dispatch(getCustomers(store_id));
  }, []);

  return <Table data={customers} tableHeader={TABLE_HEADER_CLIENTS} />;
};

export default ClientsPage;
