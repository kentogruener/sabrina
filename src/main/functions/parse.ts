import {
  BusinessCase,
  CashPointClosing,
  ImportData,
  Line,
  LineVat,
  Payment,
  TableNames,
  Transaction,
  TransactionTse,
} from 'common/tables';

const businesscasesKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'GV_TYP',
  'GV_NAME',
  'AGENTUR_ID',
  'UST_SCHLUESSEL',
  'Z_UMS_BRUTTO',
  'Z_UMS_NETTO',
  'Z_UST',
];

const cashpointclosingKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'Z_BUCHUNGSTAG',
  'TAXONOMIE_VERSION',
  'Z_START_ID',
  'Z_ENDE_ID',
  'NAME',
  'STRASSE',
  'PLZ',
  'ORT',
  'LAND',
  'STNR',
  'USTID',
  'Z_SE_ZAHLUNGEN',
  'Z_SE_BARZAHLUNGEN',
  'BLUEPOS_EXPORT_VERSION',
];

const lineKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'BON_ID',
  'POS_ZEILE',
  'GUTSCHEIN_NR',
  'ARTIKELTEXT',
  'POS_TERMINAL_ID',
  'GV_TYP',
  'GV_NAME',
  'INHAUS',
  'P_STORNO',
  'AGENTUR_ID',
  'ART_NR',
  'GTIN',
  'WARENGR_ID',
  'WARENGR',
  'MENGE',
  'FAKTOR',
  'EINHEIT',
  'STK_BR',
  'FREE_TEXT_FOR_ITEM',
];

const lineVatKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'BON_ID',
  'POS_ZEILE',
  'UST_SCHLUESSEL',
  'POS_BRUTTO',
  'POS_NETTO',
  'POS_UST',
];

const paymentKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'ZAHLART_TYP',
  'ZAHLART_NAME',
  'ZAHLART_BETRAG',
  'INCLUDED_PAYMENT_TYPE_NAMES',
];

const transactionKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'BON_ID',
  'BON_NR',
  'BON_TYP',
  'BON_NAME',
  'TERMINAL_ID',
  'BON_STORNO',
  'BON_START',
  'BON_ENDE',
  'BEDIENER_ID',
  'BEDIENER_NAME',
  'UMS_BRUTTO',
  'KUNDE_NAME',
  'KUNDE_ID',
  'KUNDE_TYP',
  'KUNDE_STRASSE',
  'KUNDE_PLZ',
  'KUNDE_ORT',
  'KUNDE_LAND',
  'KUNDE_USTID',
  'BON_NOTIZ',
  'AUFRECHNUNG_NR',
  'VORGANG_NR',
  'INVOICE_NUMBER',
  'INVOICE_NUMBER_TRAINING',
  'BELEG_NUMBER',
  'BELEG_NUMBER_TRAINING',
  'CHANGE_OF_PAYMENT',
  'ERROR_INDENT',
];

const transactionTseKeys = [
  'Z_KASSE_ID',
  'Z_ERSTELLUNG',
  'Z_NR',
  'BON_ID',
  'TSE_ID',
  'TSE_TANR',
  'TSE_TA_START',
  'TSE_TA_ENDE',
  'TSE_TA_VORGANGSART',
  'TSE_TA_SIGZ',
  'TSE_TA_SIG',
  'TSE_TA_FEHLER',
  'TSE_VORGANGSDATEN',
];

function arrToObj(arr: string[], objKeys: string[]) {
  return arr.reduce((acc, cur, idx) => {
    return {
      ...acc,
      [objKeys[idx]]: cur,
    };
  }, {});
}

export default function parse(
  table: TableNames,
  data: string[][],
  importData: ImportData
) {
  switch (table) {
    case 'businesscases':
      importData.data.businesscases = data.map((row) => {
        return arrToObj(row, businesscasesKeys) as BusinessCase;
      });
      break;
    case 'cashpointclosing':
      importData.data.cashpointclosing = data.map((row) => {
        return arrToObj(row, cashpointclosingKeys) as CashPointClosing;
      });
      break;
    case 'line':
      importData.data.lines = data.map((row) => {
        return arrToObj(row, lineKeys) as Line;
      });
      break;
    case 'lines_vat':
      importData.data.lines_vat = data.map((row) => {
        return arrToObj(row, lineVatKeys) as LineVat;
      });
      break;
    case 'payment':
      importData.data.payment = data.map((row) => {
        return arrToObj(row, paymentKeys) as Payment;
      });
      break;
    case 'transactions':
      importData.data.transactions = data.map((row) => {
        return arrToObj(row, transactionKeys) as Transaction;
      });
      break;
    case 'transactions_tse':
      importData.data.transactions_tse = data.map((row) => {
        return arrToObj(row, transactionTseKeys) as TransactionTse;
      });
      break;
    default:
      break;
  }
}
