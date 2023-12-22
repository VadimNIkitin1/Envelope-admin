import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import Table from '../../widgets/Table/Table';
import { TABLE_HEADER_CLIENTS } from './ClientsPage.data';
import { getCustomers } from '../../store/reportSlice';

import { useParams } from 'react-router';

const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const customers = useAppSelector((state) => state.report.customers);

  useEffect(() => {
    dispatch(getCustomers(store_id));
  }, []);

  return <Table data={customers} tableHeader={TABLE_HEADER_CLIENTS} />;
};

export default ClientsPage;
