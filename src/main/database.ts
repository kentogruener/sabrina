import Database from 'better-sqlite3';

const db = new Database('registers.db', {});
db.pragma('journal_mode = WAL');

// CREATE events table
db.exec(
  `CREATE TABLE IF NOT EXISTS events (
    uuid BLOB NOT NULL PRIMARY KEY,
    name TEXT
  )`
);

// CREATE registers table
db.exec(
  `CREATE TABLE IF NOT EXISTS registers (
    uuid BLOB NOT NULL,
    name TEXT,

    PRIMARY KEY(uuid)
  )`
);

// CREATE businesscases table
db.exec(
  `CREATE TABLE IF NOT EXISTS businesscases (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    GV_TYP TEXT,
    GV_NAME TEXT,
    AGENTUR_ID TEXT,
    UST_SCHLUESSEL TEXT,
    Z_UMS_BRUTTO TEXT,
    Z_UMS_NETTO TEXT,
    Z_UST TEXT
  )`
);

// CREATE cashpointclosing table
db.exec(
  `CREATE TABLE IF NOT EXISTS cashpointclosing (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    Z_BUCHUNGSTAG TEXT,
    TAXONOMIE_VERSION TEXT,
    Z_START_ID TEXT,
    Z_ENDE_ID TEXT,
    NAME TEXT,
    STRASSE TEXT,
    PLZ TEXT,
    ORT TEXT,
    LAND TEXT,
    STNR TEXT,
    USTID TEXT,
    Z_SE_ZAHLUNGEN TEXT,
    Z_SE_BARZAHLUNGEN TEXT,
    BLUEPOS_EXPORT_VERSION TEXT
  )`
);

// CREATE lines table
db.exec(
  `CREATE TABLE IF NOT EXISTS lines (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    BON_ID TEXT,
    POS_ZEILE TEXT,
    GUTSCHEIN_NR TEXT,
    ARTIKELTEXT TEXT,
    POS_TERMINAL_ID TEXT,
    GV_TYP TEXT,
    GV_NAME TEXT,
    INHAUS TEXT,
    P_STORNO TEXT,
    AGENTUR_ID TEXT,
    ART_NR TEXT,
    GTIN TEXT,
    WARENGR_ID TEXT,
    WARENGR TEXT,
    MENGE TEXT,
    FAKTOR TEXT,
    EINHEIT TEXT,
    STK_BR TEXT,
    FREE_TEXT_FOR_ITEM TEXT
  )`
);

// CREATE lines_vat table
db.exec(
  `CREATE TABLE IF NOT EXISTS lines_vat (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    BON_ID TEXT,
    POS_ZEILE TEXT,
    UST_SCHLUESSEL TEXT,
    POS_BRUTTO TEXT,
    POS_NETTO TEXT,
    POS_UST TEXT
  )`
);

// CREATE payments table
db.exec(
  `CREATE TABLE IF NOT EXISTS payment (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    ZAHLART_TYP TEXT,
    ZAHLART_NAME TEXT,
    ZAHLART_BETRAG TEXT,
    INCLUDED_PAYMENT_TYPE_NAMES TEXT
  )`
);

// CREATE transactions table
db.exec(
  `CREATE TABLE IF NOT EXISTS transactions (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    BON_ID TEXT,
    BON_NR TEXT,
    BON_TYP TEXT,
    BON_NAME TEXT,
    TERMINAL_ID TEXT,
    BON_STORNO TEXT,
    BON_START TEXT,
    BON_ENDE TEXT,
    BEDIENER_ID TEXT,
    BEDIENER_NAME TEXT,
    UMS_BRUTTO TEXT,
    KUNDE_NAME TEXT,
    KUNDE_ID TEXT,
    KUNDE_TYP TEXT,
    KUNDE_STRASSE TEXT,
    KUNDE_PLZ TEXT,
    KUNDE_ORT TEXT,
    KUNDE_LAND TEXT,
    KUNDE_USTID TEXT,
    BON_NOTIZ TEXT,
    AUFRECHNUNG_NR TEXT,
    VORGANG_NR TEXT,
    INVOICE_NUMBER TEXT,
    INVOICE_NUMBER_TRAINING TEXT,
    BELEG_NUMBER TEXT,
    BELEG_NUMBER_TRAINING TEXT,
    CHANGE_OF_PAYMENT TEXT,
    ERROR_INDENT TEXT
  )`
);

// CREATE transactions_tse table
db.exec(
  `CREATE TABLE IF NOT EXISTS transactions_tse (
    uuid BLOB NOT NULL PRIMARY KEY,
    event_id BLOB NOT NULL REFERENCES events(uuid),
    register_id BLOB NOT NULL REFERENCES registers(uuid),

    Z_KASSE_ID TEXT,
    Z_ERSTELLUNG TEXT,
    Z_NR TEXT,
    BON_ID TEXT,
    TSE_ID TEXT,
    TSE_TANR TEXT,
    TSE_TA_START TEXT,
    TSE_TA_ENDE TEXT,
    TSE_TA_VORGANGSART TEXT,
    TSE_TA_SIGZ TEXT,
    TSE_TA_SIG TEXT,
    TSE_TA_FEHLER TEXT,
    TSE_VORGANGSDATEN TEXT
  )`
);

export default db;
