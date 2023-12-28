import style from './SettingsPage.module.scss';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { editActivityStore, getOneStore } from '../../store/storeSlice';
import { useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router';
import {
  TABLE_CHATS,
  TABLE_DELIVERY,
  TABLE_INFO,
  TABLE_LEGAL,
  TABLE_PAYMENTS,
  TABLE_TOKEN,
  TABLE_TYPE_ORDER,
} from './SettingsPage.data';
import { ChakraTable } from '../../widgets/ChakraTable/ChakraTable';
import { triggerRender } from '../../store/activeSlice';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ModalType } from '../../store/modalsSlice';
import { ModalLegalInfo } from '../../widgets/Modals/ModalLegalInfo/ModalLegalInfo';
import { ModalChats } from '../../widgets/Modals/ModalChats/ModalChats';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { theme, render } = useAppSelector((state) => state.active);
  const { modalLegalInfo, modalChats } = useAppSelector((state) => state.modals);
  const { store } = useAppSelector((state) => state.store);
  const { store_id } = useParams();

  useEffect(() => {
    dispatch(getOneStore(store_id));
  }, [render]);

  const handleClick = (id) => {
    dispatch(editActivityStore(id));
    dispatch(triggerRender());
  };

  return (
    <>
      <div className={clsx(style.information_table, theme && style.light)}>
        <div className={style.table_item}>
          <p className={style.table_item__first}>Статус работы</p>
          <Menu>
            <MenuButton>
              <div
                className={clsx(
                  style.status,
                  theme && style.light,
                  store.subscriptions.is_active && style.active
                )}
              >
                {store.subscriptions.is_active ? 'Активный' : 'Неактивный'}
                <IoIosArrowDown />
              </div>
            </MenuButton>
            <MenuList backgroundColor={'#212121'}>
              <MenuItem backgroundColor={'#212121'} onClick={() => handleClick(store_id)}>
                {store.subscriptions.is_active ? 'Остановить 🛑' : 'Активировать 🟢'}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <ChakraTable staticData={TABLE_INFO} dynamicData={store.info} />
      <ChakraTable staticData={TABLE_TOKEN} dynamicData={store.bot_tokens} />
      <ChakraTable staticData={TABLE_TYPE_ORDER} dynamicData={store.association} />
      <ChakraTable staticData={TABLE_PAYMENTS} dynamicData={store.payments} />
      <ChakraTable staticData={TABLE_DELIVERY} dynamicData={store.delivery_info} />
      <ChakraTable staticData={TABLE_CHATS} dynamicData={store.service_text_and_chats} />
      <ChakraTable staticData={TABLE_LEGAL} dynamicData={store.legal_information} />
      {modalLegalInfo && <ModalLegalInfo isOpen={modalLegalInfo} type={ModalType.LEGAL_INFO} />}
      {modalChats && <ModalChats type={ModalType.CHATS} isOpen={modalChats} />}
    </>
  );
};

export default SettingsPage;
