import * as mysqlServer from "mysql";
import { results } from './results';
import { endpoints } from './endpoints';
import { users } from './users';
import { auth } from './auth';
import * as db from '../../config';

export const connection = mysqlServer.createConnection({
  host: db.MYSQL_HOST,
  user: db.MYSQL_USER,
  password: db.MYSQL_PASSWORD,
  database: db.MYSQL_DATABASE
});

export type ErrorHandler = (error: Error, message: string) => void; 

const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};

export const resultModule = results({ connection, errorHandler });
export const endpointModule = endpoints({ connection, errorHandler });
export const usersModule = users({ connection, errorHandler });
export const authModule = auth({ connection, errorHandler });
