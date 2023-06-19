import styled from 'styled-components';
import Row from './Row';

interface ITable {
  header: string[];
  data: string[][];
}

export default function Table({ header, data }: ITable) {
  return (
    <TableContainer>
      <Row entry={header} />
      <hr />
      {data.map((value) => {
        return <Row entry={value} />;
      })}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
`;
