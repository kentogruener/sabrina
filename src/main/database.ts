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

export default db;
