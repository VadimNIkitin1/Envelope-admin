import { useAppSelector } from '../../types/hooks';

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import { clsx } from 'clsx';
import style from './ChakraTable.module.scss';
import { TableCheckbox } from '../../shared/TableCheckbox/TableCheckbox';
import { Fragment } from 'react';

const ChakraTable = ({ staticData, dynamicData }) => {
  const { theme } = useAppSelector((state) => state.active);

  return (
    <TableContainer maxWidth={'80%'}>
      <Table variant="unstyled" className={clsx(style.table, theme && style.light)}>
        <Thead>
          <Tr>
            <Th color={'#7669c8'}>{staticData.header}</Th>
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
