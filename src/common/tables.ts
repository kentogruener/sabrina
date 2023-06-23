export const ListTableNames = [
  'businesscases',
  'cashpointclosing',
  'lines',
  'lines_vat',
  'payment',
  'transactions',
  'transactions_tse',
];

export type TableNames = (typeof ListTableNames)[number];

export type RegisterDataPoint = {
  uuid: string;
  event_id: string;
  register_id: string;
};

export type BusinessCase = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  GV_TYP: string;
  GV_NAME: string;
  AGENTUR_ID: string;
  UST_SCHLUESSEL: string;
  Z_UMS_BRUTTO: string;
  Z_UMS_NETTO: string;
  Z_UST: string;
};

export type CashPointClosing = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  Z_BUCHUNGSTAG: string;
  TAXONOMIE_VERSION: string;
  Z_START_ID: string;
  Z_ENDE_ID: string;
  NAME: string;
  STRASSE: string;
  PLZ: string;
  ORT: string;
  LAND: string;
  STNR: string;
  USTID: string;
  Z_SE_ZAHLUNGEN: string;
  Z_SE_BARZAHLUNGEN: string;
  BLUEPOS_EXPORT_VERSION: string;
};

export type Line = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  BON_ID: string;
  POS_ZEILE: string;
  GUTSCHEIN_NR: string;
  ARTIKELTEXT: string;
  POS_TERMINAL_ID: string;
  GV_TYP: string;
  GV_NAME: string;
  INHAUS: string;
  P_STORNO: string;
  AGENTUR_ID: string;
  ART_NR: string;
  GTIN: string;
  WARENGR_ID: string;
  WARENGR: string;
  MENGE: string;
  FAKTOR: string;
  EINHEIT: string;
  STK_BR: string;
  FREE_TEXT_FOR_ITEM: string;
};

export type LineVat = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  BON_ID: string;
  POS_ZEILE: string;
  UST_SCHLUESSEL: string;
  POS_BRUTTO: string;
  POS_NETTO: string;
  POS_UST: string;
};

export type Payment = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  ZAHLART_TYP: string;
  ZAHLART_NAME: string;
  ZAHLART_BETRAG: string;
  INCLUDED_PAYMENT_TYPE_NAMES: string;
};

export type Transaction = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  BON_ID: string;
  BON_NR: string;
  BON_TYP: string;
  BON_NAME: string;
  TERMINAL_ID: string;
  BON_STORNO: string;
  BON_START: string;
  BON_ENDE: string;
  BEDIENER_ID: string;
  BEDIENER_NAME: string;
  UMS_BRUTTO: string;
  KUNDE_NAME: string;
  KUNDE_ID: string;
  KUNDE_TYP: string;
  KUNDE_STRASSE: string;
  KUNDE_PLZ: string;
  KUNDE_ORT: string;
  KUNDE_LAND: string;
  KUNDE_USTID: string;
  BON_NOTIZ: string;
  AUFRECHNUNG_NR: string;
  VORGANG_NR: string;
  INVOICE_NUMBER: string;
  INVOICE_NUMBER_TRAINING: string;
  BELEG_NUMBER: string;
  BELEG_NUMBER_TRAINING: string;
  CHANGE_OF_PAYMENT: string;
  ERROR_INDENT: string;
};

export type TransactionTse = RegisterDataPoint & {
  Z_KASSE_ID: string;
  Z_ERSTELLUNG: string;
  Z_NR: string;
  BON_ID: string;
  TSE_ID: string;
  TSE_TANR: string;
  TSE_TA_START: string;
  TSE_TA_ENDE: string;
  TSE_TA_VORGANGSART: string;
  TSE_TA_SIGZ: string;
  TSE_TA_SIG: string;
  TSE_TA_FEHLER: string;
  TSE_VORGANGSDATEN: string;
};

export type ImportData = {
  filepath: string;
  filename: string;
  data: {
    businesscases: BusinessCase[];
    cashpointclosing: CashPointClosing[];
    lines: Line[];
    lines_vat: LineVat[];
    payment: Payment[];
    transactions: Transaction[];
    transactions_tse: TransactionTse[];
  };
};
