export type TableNames =
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

export type Register = {
  filename: string;
  uuid: string;
  data: {
    [key in TableNames]: DataTable;
  };
};
