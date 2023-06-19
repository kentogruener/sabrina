import Database from 'better-sqlite3';
import { ListTableNames, Register, TableNames } from 'common/register';
import { randomUUID } from 'crypto';
import { IpcMainEvent, dialog } from 'electron';
import StreamZip from 'node-stream-zip';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const test = db.name;

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

        // Skip all unwanted files
        if (!ListTableNames.includes(filename)) return;
        // Convert to type to satisfy TS
        const tableName = filename as TableNames;

        // Get data by filepath of .csv file
        const data = await zip.entryData(file);

        // Convert to string
        const stringified = data.toString('utf8');

        // Split by line
        const rows = stringified.split('\r\n');

        // Split header and data
        const [header, ...lines] = rows;

        // Split header and data by ;
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
