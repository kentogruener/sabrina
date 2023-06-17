import Page from 'renderer/components/page/Page';
import { H1 } from 'renderer/components/typography/Typography';
import useAppStore from 'renderer/store/AppStore';
import styled from 'styled-components';

export default function Import() {
  const { registers } = useAppStore((state) => ({
    registers: state.registers,
  }));

  return (
    <Page>
      <H1>Import</H1>
      <ImportControl />
      {Array.from(registers.entries()).map(([key, register]) => {
        let totalRows = 0;
        Object.keys(register.data).forEach((tablekey) => {
          const tableIndexKey = tablekey as keyof typeof register.data;
          totalRows += register.data[tableIndexKey].rowCount;
        });

        return (
          <div key={key}>
            <h2>{register.filename}</h2>
            <p>{register.uuid}</p>
            <p>Total rows: {totalRows}</p>
          </div>
        );
      })}
    </Page>
  );
}

function ImportControl() {
  const { clearAllRegister } = useAppStore((state) => ({
    clearAllRegister: state.clearAllRegister,
  }));

  return (
    <ControlContainer>
      <ImportButton
        onClick={() => window.electron.ipcRenderer.sendMessage('import-file')}
      >
        Import
      </ImportButton>
      <ImportButton onClick={() => clearAllRegister()}>Clear all</ImportButton>
    </ControlContainer>
  );
}

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ImportButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
