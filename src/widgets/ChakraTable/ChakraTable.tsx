import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tooltip } from '@chakra-ui/react';

import { clsx } from 'clsx';
import style from './ChakraTable.module.scss';
import { TableCheckbox } from '../../shared/TableCheckbox/TableCheckbox';
import { Fragment } from 'react';
import Button from '../../shared/Button/Button';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { ModalType, toggleModal } from '../../store/modalsSlice';

const ChakraTable = ({ staticData, dynamicData }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.active);

  const handleClick = (modal) => {
    if (modal === ModalType.LEGAL_INFO) {
      dispatch(toggleModal({ action: true, type: ModalType.LEGAL_INFO }));
    }
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
                          onChange={() => console.log(`${checkbox.is_active}`)}
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
                        onChange={() => console.log(`${checkbox.code}`)}
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

export { ChakraTable };
