import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import { IpcMainEvent, dialog } from 'electron';
import StreamZip from 'node-stream-zip';
import { ListTableNames, Register, TableNames } from '../common/register';

const db = new Database('registers.db', {});
db.pragma('journal_mode = WAL');

const importFunction = async (event: IpcMainEvent) => {
  const result = await dialog.showOpenDialog({
    filters: [
      {
        name: '.zip',
        extensions: ['zip'],
      },
    ],
  });

  if (result.canceled) return;

  const filepaths = result.filePaths;

  if (filepaths.length === 0) return;

  filepaths.forEach(async (filepath) => {
    // eslint-disable-next-line new-cap
    const zip = new StreamZip.async({ file: filepath });

    const entries = await zip.entries();

    const files = Object.keys(entries).filter((entry) =>
      entry.endsWith('.csv')
    );

    const register = {
      filename: filepath,
      uuid: randomUUID(),
      data: {},
    } as Register;

    await Promise.all(
      files.map(async (file) => {
        const filename = file.split('.')[0];
        if (!ListTableNames.includes(filename)) return;
        const tableName = filename as TableNames;

        const data = await zip.entryData(file);
        const stringified = data.toString('utf8');
        const rows = stringified.split('\r\n');
        const [header, ...lines] = rows;

        const headers = header.split(';');
        const lineData = lines.map((line) => line.split(';'));

        register.data[tableName] = {
          headers,
          data: lineData,
          rowCount: lineData.length,
        };
      })
    );

    event.reply('import-file', register);
  });
};

export default importFunction;
