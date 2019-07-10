import * as mysqlServer from 'mysql';
import * as conf from '../../config';
import { auth } from './auth';
import { endpoints } from './endpoints';
import { Db } from './interfaces';
import { results } from './results';
import { users } from './users';

const connection = mysqlServer.createConnection({
  host: conf.MYSQL_HOST,
  user: conf.MYSQL_USER,
  password: conf.MYSQL_PASSWORD,
  database: conf.MYSQL_DATABASE,
});

export type ErrorHandler = (error: Error, message: string) => void; 

const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};

export const db: Db = {
  resultModule: results({ connection, errorHandler }),
  endpointModule: endpoints({ connection, errorHandler }),
  usersModule: users({ connection, errorHandler }),
  authModule: auth({ connection, errorHandler }),
};
