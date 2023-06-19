import Database from 'better-sqlite3';

const db = new Database('registers.db', {});
db.pragma('journal_mode = WAL');

// TODO decide which tables are really needed
db.exec(
  'CREATE TABLE IF NOT EXISTS allocation_groups (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, comment TEXT, PRIMARY KEY(register_id, nr, bon))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS businesscases (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, type TEXT, name TEXT, agency INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust REAL, PRIMARY KEY(register_id, nr, ust_key))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS cash_per_currency (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, currency TEXT, value REAL, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS cashpointclosing (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, day TEXT, start_id INTEGER, end_id INTEGER, payment REAL, bar_payment REAL, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS datapayment (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, type TEXT, code TEXT, value REAL, basis_value REAL, PRIMARY KEY(register_id, nr))'
);
// TODO no data
/* db.exec(
    'CREATE TABLE IF NOT EXISTS itemamounts (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, type TEXT, code TEXT, value REAL, basis_value REAL, PRIMARY KEY(register_id, nr))'
  );
*/

db.exec(
  'CREATE TABLE IF NOT EXISTS lines (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, voucher TEXT, description TEXT, terminal_id TEXT, gv_type TEXT, gv_name TEXT, inhouse TEXT, storno INTEGER, agency INTEGER, art_nr INTEGER, gtin TEXT, warengr_id TEXT, warengr TEXT, amount REAL, factor REAL, unit TEXT, stk REAL, freetext TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS lines_vat (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust TEXT, PRIMARY KEY(register_id, nr))'
);

// TODO is location data needed
/* db.exec(
    'CREATE TABLE IF NOT EXISTS location (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, type TEXT, code TEXT, value REAL, basis_value REAL, PRIMARY KEY(register_id, nr))'
  );
  */

// TODO no data
/*  db.exec(
    'CREATE TABLE IF NOT EXISTS pa (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, type TEXT, code TEXT, value REAL, basis_value REAL, PRIMARY KEY(register_id, nr))'
  );
  */

db.exec(
  'CREATE TABLE IF NOT EXISTS payment (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, type TEXT, name TEXT, value REAL, included_payment_types TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS refs (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, ref_type TEXT, ref_name REAL, ref_datum TEXT, ref_register_id TEXT, ref_nr INTEGER, ref_bon INTEGER, PRIMARY KEY(register_id, nr))'
);

// TODO do later
/* db.exec(
    'CREATE TABLE IF NOT EXISTS slaves (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust TEXT, PRIMARY KEY(register_id, nr))'
  );
*/

// TODO no data
/* db.exec(
    'CREATE TABLE IF NOT EXISTS subitems (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust TEXT, PRIMARY KEY(register_id, nr))'
  );
  */

db.exec(
  'CREATE TABLE IF NOT EXISTS transactions (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, tse INTEGER, tse_tanr TEXT, tse_ta_start TEXT, tse_ta_end TEXT, tsa_ta_vorgang TEXT, tse_ta_sigz TEXT, tse_ta_sig TEXT, tse_ta_error TEXT, tse_vorgangsdaten TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS transaction_tse (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, pos_line INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS transaction_vat (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, bon INTEGER, ust_key INTEGER, brutto REAL, netto REAL, ust TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS tse (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, tse_id TEXT, tse_serial TEXT, tse_sig_algo TEXT, tse_time TEXT, tse_pd_encoding TEXT, tse_public_key TEXT, tse_certificate_1 TEXT, tse_certificate_2 TEXT, PRIMARY KEY(register_id, nr))'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS vat (uuid BLOB NOT NULL, register_id TEXT, timestamp TEXT, nr INTEGER, ust_key INTEGER, ust_satz TEXT ust_beschr TEXT, custom_in_bluepos_used_vat TEXT, PRIMARY KEY(register_id, nr))'
);
export default db;
