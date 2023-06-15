import { Register, TableNames } from 'common/register';
import { dialog, IpcMainEvent } from 'electron';
import StreamZip from 'node-stream-zip';

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
      data: {},
    } as Register;

    await Promise.all(
      files.map(async (file) => {
        const data = await zip.entryData(file);
        const stringified = data.toString('utf8');
        const rows = stringified.split('\r\n');
        const [header, ...lines] = rows;

        const headers = header.split(';');
        const lineData = lines.map((line) => line.split(';'));

        const tableName = file.split('.')[0] as TableNames;

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
