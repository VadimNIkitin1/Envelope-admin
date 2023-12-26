import style from './SettingsPage.module.scss';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { getOneStore } from '../../store/storeSlice';
import { useEffect } from 'react';
import { TableCheckbox } from '../../shared/TableCheckbox/TableCheckbox';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router';
import { TABLE_CHATS, TABLE_LEGAL, TABLE_PAYMENTS } from './SettingsPage.data';
import { ChakraTable } from '../../widgets/ChakraTable/ChakraTable';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { theme, render } = useAppSelector((state) => state.active);
  const { store } = useAppSelector((state) => state.store);
  const { store_id } = useParams();

  useEffect(() => {
    dispatch(getOneStore(store_id));
  }, [render]);

  return (
    <>
      <div className={clsx(style.information_table, theme && style.light)}>
        <h2 style={{ color: '#7669c8' }}>О заведении</h2>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Название магазина</p>
          <p>{store.info.name ? store.info.name : '-'}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Статус работы</p>
          <div className={clsx(style.status, theme && style.light)}>
            {store.subscriptions.is_active ? 'Активный' : 'Неактивный'}
            <IoIosArrowDown />
          </div>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Адрес</p>
          <p>{store.info.adress}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Номер телефона</p>
          <p>{store.info.number_phone}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Координаты</p>
          <p>
            {store.info.latitude} : {store.info.longitude}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Ссылка на бота</p>
          <a href={store.info.link_bot} target="_blank">
            {store.info.link_bot ? store.info.link_bot : '-'}
          </a>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Токен бота</p>
          <p>{store.bot_tokens.token_bot ? store.bot_tokens.token_bot : '-'}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Типы заказа</p>
          <div className={style.table_item__checkboxes}>
            {store.association.map((order) => (
              <div className={style.table_item__checkboxes} key={order.order_type_id}>
                <TableCheckbox checked={order.is_active} onChange={() => console.log('check')} />
                {order.order_type.name}
              </div>
            ))}
          </div>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>График работы</p>
          <div className={style.table_item__checkboxes}>
            <TableCheckbox checked={store.info.format_24_7} onChange={() => console.log('check')} />
            24/7{' '}
          </div>
          <div className={style.table_item__checkboxes}>
            <TableCheckbox
              checked={store.info.format_unified}
              onChange={() => console.log('check')}
            />
            Единый [{store.info.open_hours_default} : {store.info.close_hours_default}]{' '}
          </div>
          <div className={style.table_item__checkboxes}>
            <TableCheckbox
              checked={store.info.format_custom}
              onChange={() => console.log('check')}
            />
            Вариативный{' '}
          </div>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Часовой пояс</p>
          <p>{store.info.time_zone ? store.info.time_zone : '-'}</p>
        </div>
      </div>
      <ChakraTable staticData={TABLE_PAYMENTS} dynamicData={store.payments} />
      <div className={clsx(style.information_table, theme && style.light)}>
        <h2 style={{ color: '#7669c8' }}>Доставка</h2>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Тип доставки</p>
          <p>{}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Минимальная сумма доставки</p>
          <p>249р.</p>
        </div>
      </div>
      <ChakraTable staticData={TABLE_CHATS} dynamicData={store.service_text_and_chats} />
      <ChakraTable staticData={TABLE_LEGAL} dynamicData={store.legal_information} />
    </>
  );
};

export default SettingsPage;
