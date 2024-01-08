import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { Table } from '@/widgets/Table';

import { TABLE_HEADER_CLIENTS } from './data';

import { getCustomers } from '@/store/reportSlice';

const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const customers = useAppSelector((state) => state.report.customers);

  useEffect(() => {
    dispatch(getCustomers(store_id));
  }, []);

  return <Table data={customers} tableHeader={TABLE_HEADER_CLIENTS} />;
};

export { ClientsPage };
