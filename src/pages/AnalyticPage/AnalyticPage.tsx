import Table from '../../widgets/Table/Table';

import {
  TABLE_HEADER_ANALYTIC_FOR_CATEGORY,
  TABLE_HEADER_ANALYTIC_FOR_PRODUCT,
} from './AnalyticPage.data';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { useEffect } from 'react';
import { getTotalSalesForCategory, getTotalSalesForProduct } from '../../store/reportSlice';

const AnalyticPage = ({ type }) => {
  const dispatch = useAppDispatch();
  const { totalSalesForCategory, totalSalesForProduct } = useAppSelector((state) => state.report);

  useEffect(() => {
    if (type === 'store') {
      const store_id = localStorage.getItem('store_id' || '');

      dispatch(getTotalSalesForCategory(store_id));
      dispatch(getTotalSalesForProduct(store_id));
    }
  }, []);

  return (
    <>
      {type === 'store' && (
        <>
          <Table data={totalSalesForCategory} tableHeader={TABLE_HEADER_ANALYTIC_FOR_CATEGORY} />
          <br />
          <Table data={totalSalesForProduct} tableHeader={TABLE_HEADER_ANALYTIC_FOR_PRODUCT} />
        </>
      )}
      {type === 'user' && <p>Аналитика всех магазинов</p>}
    </>
  );
};

export default AnalyticPage;
