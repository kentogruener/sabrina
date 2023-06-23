/* eslint-disable camelcase */
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { Event } from 'common/events';
import { IParameterType, IQueryType, IRunQuery } from 'common/query';
import { Register } from 'common/register';
import { ImportData } from 'common/tables';
import { randomUUID } from 'crypto';
import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'import-file'
  | 'run-sql'
  | 'query-result'
  | 'add-event'
  | 'retrieveEvents';

const waitForResult = <T>(
  type: IQueryType,
  query: string,
  parameters?: IParameterType
): Promise<T> => {
  ipcRenderer.send('run-sql', {
    type,
    query,
    parameters,
  } as IRunQuery);
  return new Promise<T>((resolve) => {
    ipcRenderer.once('sql-result', (event, result) => {
      resolve(result as any as T);
    });
  });
};

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  db: {
    events: {
      getById(uuid: string): Promise<Event> {
        return waitForResult('all', 'SELECT * FROM events WHERE uuid = ?', [
          uuid,
        ]);
      },
      getAll(): Promise<Event[]> {
        return waitForResult('all', 'SELECT * from events');
      },
      deleteById(uuid: string): Promise<void> {
        return waitForResult('run', 'DELETE FROM events WHERE uuid = ?', [
          uuid,
        ]);
      },
      addEvent(name: string): Promise<void> {
        return waitForResult(
          'run',
          'INSERT INTO events (uuid, name) VALUES (?, ?)',
          [randomUUID(), name]
        );
      },
    },
    registers: {
      addRegister(name: string): Promise<void> {
        return waitForResult(
          'run',
          'INSERT INTO registers (uuid, name) VALUES (?, ?)',
          [randomUUID(), name]
        );
      },
      getAll(): Promise<Register[]> {
        return waitForResult('all', 'SELECT * from registers');
      },
      deleteById(uuid: string): Promise<void> {
        return waitForResult('run', 'DELETE FROM registers WHERE uuid = ?', [
          uuid,
        ]);
      },
    },
  },
  import() {
    ipcRenderer.send('import-file');
    return new Promise<ImportData[]>((resolve) => {
      ipcRenderer.once('import-result', (_event, importData) => {
        resolve(importData as ImportData[]);
      });
    });
  },
  writeToDB(
    data: {
      index: number;
      data: ImportData;
      register: {
        name: string;
        id: string;
      } | null;
    }[],
    event: {
      name: string;
      id: string;
    }
  ) {
    ipcRenderer.send('write-to-db', data, event);
    return new Promise<void>((resolve) => {
      ipcRenderer.once('write-to-db-result', () => {
        resolve();
      });
    });
  },
  query: {
    run(query: string): Promise<any[]> {
      return waitForResult('all', query);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
