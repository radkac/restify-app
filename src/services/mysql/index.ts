import * as mysqlServer from "mysql";
import { results } from './results';
import { endpoints } from './endpoints';
import { users } from './users';
import { auth } from './auth';
import * as conf from '../../config';

export const connection = mysqlServer.createConnection({
  host: conf.MYSQL_HOST,
  user: conf.MYSQL_USER,
  password: conf.MYSQL_PASSWORD,
  database: conf.MYSQL_DATABASE
});

export type ErrorHandler = (error: Error, message: string) => void; 

const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};

export const resultModule = results({ connection, errorHandler });
export const endpointModule = endpoints({ connection, errorHandler });
export const usersModule = users({ connection, errorHandler });
export const authModule = auth({ connection, errorHandler });
