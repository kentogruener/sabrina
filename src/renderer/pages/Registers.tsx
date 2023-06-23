import { Register } from 'common/register';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from 'renderer/components/button/Button';
import Modal from 'renderer/components/modal/Modal';
import Page from 'renderer/components/page/Page';
import { RowWrapper } from 'renderer/components/row/Row';
import styled from 'styled-components';

function AddRegisterModal({
  show,
  setShow,
  callback,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  callback: () => void;
}) {
  const [registerName, setRegisterName] = useState<string>('');

  return (
    <Modal show={show} setShow={setShow}>
      <h1>Add event</h1>
      <input
        type="text"
        placeholder="Register name"
        onChange={(evt) => setRegisterName(evt.target.value)}
      />
      <Button
        onClick={async () => {
          await window.electron.db.registers.addRegister(registerName);
          setShow(false);
          callback();
        }}
      >
        Add
      </Button>
    </Modal>
  );
}

export default function Registers() {
  const [showAddRegister, setShowAddRegister] = useState<boolean>(false);

  const [registers, setRegisters] = useState<Register[]>([]);

  const getRegisters = async () => {
    const registersList = await window.electron.db.registers.getAll();
    setRegisters(registersList);
  };

  useEffect(() => {
    getRegisters();
  }, []);

  return (
    <>
      <AddRegisterModal
        show={showAddRegister}
        setShow={setShowAddRegister}
        callback={getRegisters}
      />
      <Page>
        <h1>Registers</h1>
        <RowWrapper>
          <Button onClick={() => setShowAddRegister(true)}>Add Register</Button>
        </RowWrapper>
        {registers.map((event) => {
          return (
            <FlexRow key={event.uuid}>
              <h1>{event.name}</h1>
              <Button
                type="button"
                onClick={async () => {
                  await window.electron.db.registers.deleteById(event.uuid);
                  await getRegisters();
                }}
              >
                Delete
              </Button>
            </FlexRow>
          );
        })}
      </Page>
    </>
  );
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 16px;
`;
