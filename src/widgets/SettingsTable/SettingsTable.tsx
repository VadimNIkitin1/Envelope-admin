import { Fragment } from 'react';
import { useParams } from 'react-router';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tooltip } from '@chakra-ui/react';
import { MdOutlineEditCalendar } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { TableCheckbox } from '@/shared/TableCheckbox';
import { Button } from '@/shared/Button';

import { ModalType, toggleModal } from '@/store/modalsSlice';
import { editCheckboxPayment, editCheckboxTypeOrder } from '@/store/storeSlice';
import { triggerRender } from '@/store/activeSlice';

import { clsx } from 'clsx';
import style from './SettingsTable.module.scss';

const SettingsTable = ({ staticData, dynamicData }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.active);
  const { store_id } = useParams();

  const handleClick = (modal: string) => {
    console.log(modal);
    if (modal === ModalType.LEGAL_INFO) {
      dispatch(toggleModal({ action: true, type: ModalType.LEGAL_INFO }));
    }

    if (modal === ModalType.CHATS) {
      dispatch(toggleModal({ action: true, type: ModalType.CHATS }));
    }

    if (modal === ModalType.PAYMENTS) {
      dispatch(toggleModal({ action: true, type: ModalType.PAYMENTS }));
    }

    if (modal === ModalType.TOKEN_BOT) {
      dispatch(toggleModal({ action: true, type: ModalType.TOKEN_BOT }));
    }

    if (modal === ModalType.INFO) {
      dispatch(toggleModal({ action: true, type: ModalType.INFO }));
    }
  };

  const hadleCheckbox = (checkbox: string) => {
    dispatch(editCheckboxPayment({ store_id, checkbox }));
    setTimeout(() => {
      dispatch(triggerRender());
    }, 200);
  };

  const hadleCheckboxTypeOrder = (order_type_id: number) => {
    dispatch(editCheckboxTypeOrder({ store_id, order_type_id }));
    setTimeout(() => {
      dispatch(triggerRender());
    }, 200);
  };

  return (
    <TableContainer maxWidth={'80%'}>
      <Table variant="unstyled" className={clsx(style.table, theme && style.light)}>
        <Thead>
          <Tr>
            <Th className={style.title_table}>
              {staticData.header}
              <Tooltip label="Редактировать" placement="top">
                <span>
                  <Button view="add" onClick={() => handleClick(staticData.code)}>
                    <MdOutlineEditCalendar />
                  </Button>
                </span>
              </Tooltip>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {staticData.data.map((el) => (
            <Tr key={el.name} className={style.table_item__checkboxes}>
              <Td>{el.name}</Td>
              <Td className={style.table_item}>
                {Array.isArray(dynamicData)
                  ? dynamicData.map((checkbox, idx) => (
                      <Fragment key={idx}>
                        <TableCheckbox
                          checked={checkbox.is_active}
                          onChange={() => hadleCheckboxTypeOrder(checkbox.order_type_id)}
                        />
                        <p>{checkbox.order_type.name}</p>
                      </Fragment>
                    ))
                  : ''}
                {el.list &&
                  el.list.map((checkbox) => (
                    <Fragment key={checkbox.name}>
                      <TableCheckbox
                        checked={dynamicData[checkbox.code]}
                        onChange={() => hadleCheckbox(checkbox.code)}
                      />
                      <p>{checkbox.name}</p>
                    </Fragment>
                  ))}
                {!Array.isArray(dynamicData) && !el.list && (
                  <p>{dynamicData && dynamicData[el.code] ? dynamicData[el.code] : '-'}</p>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { SettingsTable };
