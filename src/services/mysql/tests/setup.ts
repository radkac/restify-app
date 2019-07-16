import { Sequelize } from 'sequelize';
import * as conf from '../../../config';

export const sequelize = new Sequelize('database', 'username', 'password', {
  database: conf.MYSQL_DATABASE || 'restify',
  username: conf.MYSQL_USER || undefined,
  password: conf.MYSQL_PASSWORD || undefined,
  host: conf.MYSQL_HOST,
  port: conf.PORT,
  dialect: 'mysql',
});

export type ErrorHandler = (error: Error, message: string) => void; 

export const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};
