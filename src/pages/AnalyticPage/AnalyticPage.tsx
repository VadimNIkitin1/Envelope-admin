import Table from '../../widgets/Table/Table';
import style from './AnalyticPage.module.scss';

import {
  TABLE_HEADER_ANALYTIC_FOR_CATEGORY,
  TABLE_HEADER_ANALYTIC_FOR_PRODUCT,
} from './AnalyticPage.data';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { useEffect, useState } from 'react';
import {
  getTotalSales,
  getTotalSalesForCategory,
  getTotalSalesForProduct,
} from '../../store/reportSlice';
import { ANALYTIC_PAGE, ANALYTIC_TABLE } from '../../app/constants';

const AnalyticPage = ({ type }) => {
  const [select, setSelect] = useState<string>(ANALYTIC_TABLE.ALL);

  const dispatch = useAppDispatch();
  const { totalSalesForCategory, totalSalesForProduct, totalSales } = useAppSelector(
    (state) => state.report
  );
  console.log(totalSales);

  useEffect(() => {
    if (type === 'store') {
      const store_id = localStorage.getItem('store_id' || '');

      dispatch(getTotalSalesForCategory(store_id));
      dispatch(getTotalSalesForProduct(store_id));
      dispatch(getTotalSales(store_id));
    }
  }, []);

  return (
    <>
      <div>
        <h2 className={style.table_title}>Всего продаж на сумму {0} руб.</h2>
      </div>
      <div className={style.select_container}>
        <h2 style={{ marginRight: '20px' }}>Аналитика по</h2>
        <select value={select} onChange={(e) => setSelect(e.target.value)} className={style.select}>
          <option value={ANALYTIC_TABLE.ALL}>Всем параметрам</option>
          <option value={ANALYTIC_TABLE.CATEGORIES}>Категориям</option>
          <option value={ANALYTIC_TABLE.PRODUCTS}>Продуктам</option>
        </select>
      </div>
      {type === ANALYTIC_PAGE.STORE && (
        <>
          {select === ANALYTIC_TABLE.ALL && (
            <>
              <h2 className={style.table_title}>Аналитика по категориям</h2>
              <Table
                data={totalSalesForCategory}
                tableHeader={TABLE_HEADER_ANALYTIC_FOR_CATEGORY}
              />
              <br />
              <>
                <h2 className={style.table_title}>Аналитика по продуктам</h2>
                <Table
                  data={totalSalesForProduct}
                  tableHeader={TABLE_HEADER_ANALYTIC_FOR_PRODUCT}
                />
              </>
            </>
          )}
          {select === ANALYTIC_TABLE.CATEGORIES && (
            <>
              <h2 className={style.table_title}>Аналитика по категориям</h2>
              <Table
                data={totalSalesForCategory}
                tableHeader={TABLE_HEADER_ANALYTIC_FOR_CATEGORY}
              />
            </>
          )}
          {select === ANALYTIC_TABLE.PRODUCTS && (
            <>
              <h2 className={style.table_title}>Аналитика по продуктам</h2>
              <Table data={totalSalesForProduct} tableHeader={TABLE_HEADER_ANALYTIC_FOR_PRODUCT} />
            </>
          )}
        </>
      )}
      {type === ANALYTIC_PAGE.USER && <p>Аналитика всех магазинов</p>}
    </>
  );
};

export default AnalyticPage;
