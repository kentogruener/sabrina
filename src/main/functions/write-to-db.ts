/* eslint-disable camelcase */
import { ImportData } from 'common/tables';
import { randomUUID } from 'crypto';
import { IpcMainEvent } from 'electron';
import db from '../database';

const writeToDB = async (
  event: IpcMainEvent,
  data: {
    index: number;
    data: ImportData;
    register: {
      name: string;
      id: string;
    } | null;
  }[],
  selectedEvent: {
    name: string;
    id: string;
  }
) => {
  const { id: eventId } = selectedEvent;

  if (data.length === 0) return;

  await Promise.all(
    // Iterate zip files
    data.map(async (item) => {
      const { data: importData, register } = item;

      if (!register) return;

      const { id: registerId } = register;

      const tables = Object.entries(importData.data);

      // Iterate tables of zip file
      await Promise.all(
        tables.map(async ([tableName, tableData]) => {
          if (tableData.length === 0) return;

          const columns = [
            'uuid',
            'event_id',
            'register_id',
            ...Object.keys(tableData[0]),
          ];
          const tableColumns = columns.join(', ');
          const prefixedColumns = columns
            .map((column) => `@${column}`)
            .join(', ');
          const query = `INSERT INTO ${tableName} (${tableColumns}) VALUES (${prefixedColumns})`;
          const values = tableData.map((row) => {
            const uuid = randomUUID();
            const event_id = eventId;
            const register_id = registerId;

            return {
              ...row,
              uuid,
              event_id,
              register_id,
            };
          });

          const stmt = db.prepare(query);

          const insertMany = db.transaction((input: typeof values) => {
            input.forEach((row) => {
              stmt.run(row);
            });
          });

          insertMany(values);
        })
      );
    })
  );

  event.reply('write-to-db-result', 'pong');
};

export default writeToDB;
