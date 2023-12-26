import { useAppSelector } from '../../types/hooks';

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import { clsx } from 'clsx';
import style from './ChakraTable.module.scss';

const ChakraTable = ({ staticData, dynamicData }) => {
  const { theme } = useAppSelector((state) => state.active);

  return (
    <TableContainer maxWidth={'80%'}>
      <Table
        variant="unstyled"
        className={clsx(style.information_table_chakra, theme && style.light)}
      >
        <Thead>
          <Tr>
            <Th color={'#7669c8'}>{staticData.header}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staticData.data.map((el) => (
            <Tr key={el.name}>
              <Td>{el.name}</Td>
              <Td>{dynamicData[el.code] ? dynamicData[el.code] : '-'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { ChakraTable };
