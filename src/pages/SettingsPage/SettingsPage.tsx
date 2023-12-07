import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';
import style from './SettingsPage.module.scss';
import { clsx } from 'clsx';
import { useAppSelector } from '../../types/hooks';
import { SETTINGS_PAGE } from '../../app/constants';

const SettingsPage = ({ type }) => {
  const theme = useAppSelector((state) => state.active.theme);
  return (
    <>
      {type === SETTINGS_PAGE.USER && (
        <>
          <div className={clsx(style.themeSwitch, theme && style.light)}>
            <p>Тема</p>
            <ThemeSwitches />
          </div>
          <div className={clsx(style.themeSwitch, theme && style.light)}>
            <p>Язык</p>
            <p>Русский</p>
          </div>
        </>
      )}
      {type === SETTINGS_PAGE.STORE && (
        <>
          <div className={clsx(style.information_table, theme && style.light)}>
            <h2 style={{ color: '#7669c8' }}>О заведении</h2>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Название магазина</p>
              <p>Ресторан 1</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Адрес</p>
              <p>г. Томск, ул. Вадима Саратова 69</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Номер телефона</p>
              <p>+7969-069-69-69</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Координаты</p>
              <p>Координаты</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Ссылка на бота</p>
              <a href="https://t.me/store_demo_envelope_app_bot" target="_blank">
                @store_demo_envelope_app_bot
              </a>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Типы заказа</p>
              <p>Доставка, Самовывоз, В зале</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Активный</p>
              <p>Да</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>График работы</p>
              <p>10:00 - 22:00</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Часовой пояс</p>
              <p>GMT +3</p>
            </div>
          </div>
          <div className={clsx(style.information_table, theme && style.light)}>
            <h2 style={{ color: '#7669c8' }}>Оплата и условия доставки</h2>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Типы оплаты</p>
              <p>Картой, Наличные, СБП</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>
                Минимальная сумма заказа для бесплатной доставки
              </p>
              <p>800р.</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Минимальная сумма доставки</p>
              <p>249р.</p>
            </div>
          </div>
          <div className={clsx(style.information_table, theme && style.light)}>
            <h2 style={{ color: '#7669c8' }}>Служебные чаты</h2>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Приветственное сообщение бота</p>
              <p>Сообщение</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Изображение при приветствии</p>
              <p>Изображение</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Чат доставки</p>
              <p>Чат</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Чат заказов</p>
              <p>Чат</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Чат выполненых заказов</p>
              <p>Чат</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Чат отмененных заказов</p>
              <p>Чат</p>
            </div>
          </div>
          <div className={clsx(style.information_table, theme && style.light)}>
            <h2 style={{ color: '#7669c8' }}>Юридическая информация</h2>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Полное наименование организации</p>
              <p>наименование</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Юр адрес</p>
              <p>г. Томск, ул. Вадима Саратова 69</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>Юр телефон</p>
              <p>+7969-069-69-69</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>ИНН</p>
              <p>ИНН</p>
            </div>
            <div className={style.table_item}>
              <p className={style.table_item__first}>ОГРН</p>
              <p>ОГРН</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingsPage;
