import * as mysqlServer from "mysql";
import * as db from '../../../config';


export const connection = mysqlServer.createConnection({
  host: db.MYSQL_HOST,
  user: db.MYSQL_USER,
  password: db.MYSQL_PASSWORD,
  database: db.MYSQL_DATABASE
});

export type ErrorHandler = (error: Error, message: string) => void; 

export const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};