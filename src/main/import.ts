import { IpcMainEvent, dialog } from 'electron';
import StreamZip from 'node-stream-zip';

type TableNames =
  | 'allocation_groups'
  | 'businesscases'
  | 'cash_per_currency'
  | 'cashpointclosing'
  | 'cashregister'
  | 'datapayment'
  | 'itemamounts'
  | 'lines'
  | 'lines_vat'
  | 'location'
  | 'pa'
  | 'payment'
  | 'references'
  | 'slaves'
  | 'subitems'
  | 'transactions'
  | 'transactions_tse'
  | 'transactions_vat'
  | 'tse'
  | 'vat';

type DataTable = {
  headers: string[];
  data: string[][];
  rowCount: number;
};

type Register = {
  data: {
    [key in TableNames]: DataTable;
  };
};

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

    const Register = {
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

        Register.data[tableName] = {
          headers,
          data: lineData,
          rowCount: lineData.length,
        };
      })
    );

    event.reply('import-file', Register);
  });
};

export default importFunction;
