import { IpcMainEvent, dialog } from 'electron';
import StreamZip from 'node-stream-zip';
import { ImportData, ListTableNames, TableNames } from '../../common/tables';
import parse from './parse';

const importFunction = async (event: IpcMainEvent) => {
  const result = await dialog.showOpenDialog({
    filters: [
      {
        name: '.zip',
        extensions: ['zip'],
      },
    ],
    properties: ['openFile', 'multiSelections'],
  });

  if (result.canceled) return;

  const filepaths = result.filePaths;

  if (filepaths.length === 0) return;

  const returnData = [] as ImportData[];

  await Promise.all(
    filepaths.map(async (filepath) => {
      // eslint-disable-next-line new-cap
      const zip = new StreamZip.async({ file: filepath });

      const entries = await zip.entries();

      const files = Object.keys(entries).filter((entry) =>
        entry.endsWith('.csv')
      );

      const importData = {
        filepath,
        filename: filepath.replace(/^.*[\\/]/, ''),
        data: {},
      } as ImportData;

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

          // Remove header and trailing line
          rows.shift();
          rows.pop();

          // Convert to string[][]
          const table = rows.map((line) => line.split(';'));

          parse(tableName, table, importData);
        })
      );

      returnData.push(importData);
    })
  );

  event.reply('import-result', returnData);
};

export default importFunction;
