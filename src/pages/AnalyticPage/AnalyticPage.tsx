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
import Button from '../../shared/Button/Button';
import { TbMailForward } from 'react-icons/tb';
import { Input, Tooltip } from '@chakra-ui/react';

const AnalyticPage = ({ type }) => {
  const [select, setSelect] = useState<string>(ANALYTIC_TABLE.NONE);
  const [from, setFrom] = useState('');
  const [before, setBefore] = useState('');

  const dispatch = useAppDispatch();
  const { totalSalesForCategory, totalSalesForProduct, totalSales } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    if (type === ANALYTIC_PAGE.STORE) {
      const store_id = localStorage.getItem('store_id' || '');
      dispatch(getTotalSales(store_id));

      if (select === ANALYTIC_TABLE.CATEGORIES) {
        dispatch(getTotalSalesForCategory(store_id));
      }

      if (select === ANALYTIC_TABLE.PRODUCTS) {
        dispatch(getTotalSalesForProduct(store_id));
      }

      if (select === ANALYTIC_TABLE.ALL) {
        dispatch(getTotalSalesForCategory(store_id));
        dispatch(getTotalSalesForProduct(store_id));
      }
    }
  }, [select]);

  return (
    <>
      <div>
        <h2 className={style.table_title}>Всего продаж на сумму {totalSales.total_sales} руб.</h2>
      </div>
      <div className={style.select_container}>
        <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
          <h2 style={{ marginRight: '20px' }}>Аналитика по</h2>
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className={style.select}
          >
            <option value={ANALYTIC_TABLE.NONE}>Выбрать</option>
            <option value={ANALYTIC_TABLE.ALL}>Всем параметрам</option>
            <option value={ANALYTIC_TABLE.CATEGORIES}>Категориям</option>
            <option value={ANALYTIC_TABLE.PRODUCTS}>Продуктам</option>
          </select>
          <div className={style.period_block}>
            <p>Выбрать период</p>
            <div className={style.period_block_item}>
              <p>От</p>

              <Input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                size="sm"
                type="datetime-local"
                width={'200px'}
                borderColor={'#fb923c'}
                borderRadius={'8px'}
              />
            </div>
            <div className={style.period_block_item}>
              <p>До</p>
              <Input
                value={before}
                onChange={(e) => setBefore(e.target.value)}
                size="sm"
                type="datetime-local"
                width={'200px'}
                borderColor={'#fb923c'}
                borderRadius={'8px'}
              />
            </div>
          </div>
        </div>
        <Tooltip label={'Отправить на почту'}>
          <span>
            <Button view="add">
              <TbMailForward />
            </Button>
          </span>
        </Tooltip>
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
              <h2 className={style.table_title}>Аналитика по продуктам</h2>
              <Table data={totalSalesForProduct} tableHeader={TABLE_HEADER_ANALYTIC_FOR_PRODUCT} />
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
