import { Event } from 'common/events';
import { Register } from 'common/register';
import { ImportData } from 'common/tables';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from 'renderer/components/button/Button';
import DropDown from 'renderer/components/dropdown/DropDown';
import Modal from 'renderer/components/modal/Modal';
import Page from 'renderer/components/page/Page';
import { RowWrapper } from 'renderer/components/row/Row';
import styled from 'styled-components';

function AddEventModal({
  show,
  setShow,
  callback,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  callback: () => void;
}) {
  const [eventName, setEventName] = useState<string>('');

  return (
    <Modal show={show} setShow={setShow}>
      <h1>Add event</h1>
      <input
        type="text"
        placeholder="Event name"
        onChange={(evt) => setEventName(evt.target.value)}
      />
      <Button
        onClick={async () => {
          await window.electron.db.events.addEvent(eventName);
          setShow(false);
          callback();
        }}
      >
        Add
      </Button>
    </Modal>
  );
}

function ImportModal({
  show,
  setShow,
  data,
  events,
  registers,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: ImportData[];
  events: Event[];
  registers: Register[];
}) {
  const availableEvents = events.map((event) => ({
    name: event.name,
    id: event.uuid,
  }));

  const [mappedImportData, setMappedImportData] = useState<
    {
      index: number;
      data: ImportData;
      register: {
        name: string;
        id: string;
      } | null;
    }[]
  >();

  function getSelectedRegisterId(index: number) {
    const imported = mappedImportData?.find((entry) => entry.index === index);
    if (imported) {
      return imported.register;
    }
    return null;
  }

  function setSelectedRegisterId(index: number) {
    return function setSelected(select: { id: string; name: string }) {
      const mappedData = mappedImportData?.map((entry) => {
        if (entry.index === index) {
          return {
            ...entry,
            register: {
              name: select.name,
              id: select.id,
            },
          };
        }
        return entry;
      });
      setMappedImportData(mappedData);
    };
  }

  async function importMappedData() {
    if (!mappedImportData || !selected) return;
    await window.electron.writeToDB(mappedImportData, selected);
  }

  useEffect(() => {
    const mappedData = data.map((importData, index) => ({
      index,
      data: importData,
      register: null,
    }));
    setMappedImportData(mappedData);
  }, [data]);

  const [mappedRegisters, setMappedRegisters] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    setMappedRegisters(
      registers.map((register) => ({
        name: register.name,
        id: register.uuid,
      }))
    );
  }, [registers]);

  const [selected, setSelected] = useState<{
    name: string;
    id: string;
  } | null>(null);

  return (
    <Modal show={show} setShow={setShow}>
      <SpaceBetween>
        <h1>Import</h1>
        <DropDown
          data={availableEvents}
          selected={selected}
          setSelected={setSelected}
          defaultText="Select event"
        />
      </SpaceBetween>
      {mappedImportData &&
        mappedImportData.map((importData) => {
          return (
            <RowWrapper key={importData.data.filepath}>
              <p>{importData.data.filename}</p>
              <DropDown
                data={mappedRegisters}
                selected={getSelectedRegisterId(importData.index)}
                setSelected={setSelectedRegisterId(importData.index)}
                defaultText="Select register"
              />
            </RowWrapper>
          );
        })}
      <SpaceBetween>
        <Button
          onClick={() => {
            importMappedData();
            setShow(false);
          }}
        >
          Import
        </Button>
      </SpaceBetween>
    </Modal>
  );
}

export default function Events() {
  const [showAddEvents, setShowAddEvents] = useState<boolean>(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [registers, setRegisters] = useState<Register[]>([]);

  const [data, setData] = useState<ImportData[]>([]);
  const [showImport, setShowImport] = useState<boolean>(false);

  const importFiles = async () => {
    const importData = await window.electron.import();
    setData(importData);
    setShowImport(true);
  };

  const getEvents = async () => {
    const eventsList = await window.electron.db.events.getAll();
    setEvents(eventsList);
  };

  const getRegisters = async () => {
    const registersList = await window.electron.db.registers.getAll();
    setRegisters(registersList);
  };

  useEffect(() => {
    const updateBoth = async () => {
      await getEvents();
      await getRegisters();
    };
    updateBoth();
  }, []);

  return (
    <>
      <AddEventModal
        show={showAddEvents}
        setShow={setShowAddEvents}
        callback={getEvents}
      />
      <ImportModal
        show={showImport}
        setShow={setShowImport}
        data={data}
        events={events}
        registers={registers}
      />
      <Page>
        <h1>Events</h1>
        <RowWrapper>
          <Button onClick={() => setShowAddEvents(true)}>Add event</Button>
          <Button
            onClick={() => {
              importFiles();
            }}
          >
            Import data
          </Button>
        </RowWrapper>
        {events.map((event) => {
          return (
            <FlexRow key={event.uuid}>
              <h1>{event.name}</h1>
              <Button
                type="button"
                onClick={async () => {
                  await window.electron.db.events.deleteById(event.uuid);
                  await getEvents();
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

const SpaceBetween = styled(FlexRow)`
  justify-content: space-between;
`;
