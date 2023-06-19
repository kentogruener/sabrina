import { Register, TableNames } from 'common/register';
import { useEffect, useState } from 'react';
import Page from 'renderer/components/page/Page';
import Table from 'renderer/components/table/Table';
import useAppStore from 'renderer/store/AppStore';
import styled from 'styled-components';

export default function Dashboard() {
  const [uuid, setUuid] = useState<string>();
  const [table, setTable] = useState<string>();
  const [registerArray, setRegisterArray] = useState<Register[]>();
  const [register, setRegister] = useState<Register>();

  const { registers } = useAppStore((state) => ({
    registers: state.registers,
  }));

  useEffect(() => {
    if (uuid) setRegister(registers.get(uuid));
  }, [uuid, registers]);

  useEffect(() => {
    setRegisterArray(Array.from(registers.values()));
  }, [registers, setRegisterArray]);

  return (
    <Page>
      <h1>Dashboard</h1>
      <Row>
        {registerArray?.map((entry) => {
          return (
            <button type="button" onClick={() => setUuid(entry.uuid)}>
              {entry.filename}
            </button>
          );
        })}
      </Row>
      <Row>
        {register &&
          Object.keys(register.data).map((value) => {
            return (
              <button type="button" onClick={() => setTable(value)}>
                {value}
              </button>
            );
          })}
      </Row>
      <div>
        <p>{`Current Register: ${register?.filename}`}</p>
        <p>{`Current Table: ${table}`}</p>
      </div>
      {register && table && (
        <Table
          header={register.data[table as TableNames].headers}
          data={register.data[table as TableNames].data}
        />
      )}
    </Page>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
