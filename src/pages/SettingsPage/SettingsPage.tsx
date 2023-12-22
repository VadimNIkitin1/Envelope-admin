import style from './SettingsPage.module.scss';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { getOneStore } from '../../store/storeSlice';
import { useEffect } from 'react';
import { TableCheckbox } from '../../shared/TableCheckbox/TableCheckbox';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router';

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
      <div className={clsx(style.information_table, theme && style.light)}>
        <h2 style={{ color: '#7669c8' }}>Оплата</h2>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Типы оплаты</p>
          <div className={style.table_item__checkboxes}>
            <TableCheckbox checked={store.payments.card} onChange={() => console.log('check')} />
            Картой{' '}
          </div>
          <div className={style.table_item__checkboxes}>
            <TableCheckbox checked={store.payments.cash} onChange={() => console.log('check')} />
            Наличные{' '}
          </div>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>
            Минимальная сумма заказа для бесплатной доставки
          </p>
          <p>
            {store.payments.min_order_amount_for_free_delivery
              ? store.payments.min_order_amount_for_free_delivery
              : '-'}{' '}
            р.
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Минимальная сумма доставки</p>
          <p>{store.payments.min_delivery_amount} р.</p>
        </div>
      </div>
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
      <div className={clsx(style.information_table, theme && style.light)}>
        <h2 style={{ color: '#7669c8' }}>Служебные чаты</h2>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Служебная почта</p>
          <p>{store.service_text_and_chats.email ? store.service_text_and_chats.email : '-'}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Приветственное сообщение бота</p>
          <p>
            {store.service_text_and_chats.welcome_message_bot
              ? store.service_text_and_chats.welcome_message_bot
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Изображение при приветствии</p>
          <p>
            {store.service_text_and_chats.welcome_image
              ? store.service_text_and_chats.welcome_image
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Чат доставки</p>
          <p>
            {store.service_text_and_chats.delivery_chat
              ? store.service_text_and_chats.delivery_chat
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Чат заказов</p>
          <p>
            {store.service_text_and_chats.order_chat
              ? store.service_text_and_chats.order_chat
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Чат выполненых заказов</p>
          <p>
            {store.service_text_and_chats.completed_orders_chat
              ? store.service_text_and_chats.completed_orders_chat
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Чат отмененных заказов</p>
          <p>
            {store.service_text_and_chats.canceled_orders_chat
              ? store.service_text_and_chats.canceled_orders_chat
              : '-'}
          </p>
        </div>
      </div>
      <div className={clsx(style.information_table, theme && style.light)}>
        <h2 style={{ color: '#7669c8' }}>Юридическая информация</h2>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Полное наименование организации</p>
          <p>
            {store.legal_information.full_organization_name
              ? store.legal_information.full_organization_name
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Юр адрес</p>
          <p>{store.legal_information.legal_adress ? store.legal_information.legal_adress : '-'}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Юр телефон</p>
          <p>
            {store.legal_information.legal_number_phone
              ? store.legal_information.legal_number_phone
              : '-'}
          </p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>ИНН</p>
          <p>{store.legal_information.inn ? store.legal_information.inn : '-'}</p>
        </div>
        <div className={style.table_item}>
          <p className={style.table_item__first}>ОГРН</p>
          <p>{store.legal_information.ogrn ? store.legal_information.ogrn : '-'}</p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
