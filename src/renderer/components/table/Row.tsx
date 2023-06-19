import styled from 'styled-components';

interface IRow {
  entry: string[];
}

export default function Row({ entry }: IRow) {
  return (
    <RowContainer>
      {entry.map((value) => {
        return <CellContainer>{value}</CellContainer>;
      })}
    </RowContainer>
  );
}

const RowContainer = styled.div`
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 32px;
`;

const CellContainer = styled.div`
  height: 64px;
  min-width: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
