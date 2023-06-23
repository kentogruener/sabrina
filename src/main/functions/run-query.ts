import { IRunQuery } from 'common/query';
import { IpcMainEvent } from 'electron';
import db from '../database';

const runQuery = async (event: IpcMainEvent, queryObject: IRunQuery) => {
  const { type, query, parameters } = queryObject;
  let statement = db.prepare(query);

  if (parameters && parameters.length > 0) {
    statement = statement.bind(...parameters);
  }

  switch (type) {
    case 'all':
      event.reply('sql-result', statement.all());
      break;
    case 'run':
      event.reply('sql-result', statement.run());
      break;
    default:
      event.reply('sql-result', statement.all());
  }
};

// eslint-disable-next-line import/prefer-default-export
export { runQuery };
