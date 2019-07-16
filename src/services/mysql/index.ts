// import * as mysqlServer from 'mysql';
import * as conf from '../../config';
import { auth } from './auth';
import { endpoints } from './endpoints';
import { Db } from './interfaces';
import { results } from './results';
import { users } from './users';

import { DataTypes, Sequelize } from 'sequelize';
import { EndpointModel } from './endpointModel';
import { ResultModel } from './resultModel';
import { UserModel } from './userModel';

export const sequelize = new Sequelize({
  database: conf.MYSQL_DATABASE || 'restify',
  username: conf.MYSQL_USER || undefined,
  password: conf.MYSQL_PASSWORD || undefined,
  host: conf.MYSQL_HOST,
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 1, // Keep this very low or it'll make all Lambda requests take longer
  },
});

// export const sequelize = new Sequelize('mysql://' + conf.MYSQL_USER + ':' + conf.MYSQL_PASSWORD + '@' + conf.MYSQL_HOST + ':' + conf.PORT + '/' + conf.MYSQL_DATABASE);

ResultModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    endpointId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'projects',
  },
);

EndpointModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    interval: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'endpoints',
    sequelize: sequelize,    
  },
);

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
  },
);

ResultModel.hasOne(EndpointModel, {
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

UserModel.hasMany(EndpointModel, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'endpoints',
});

EndpointModel.hasOne(UserModel, { sourceKey: 'id' });

EndpointModel.hasMany(ResultModel, {
  sourceKey: 'id',
  foreignKey: 'endpointId',
  as: 'results',
  onDelete: 'CASCADE',
});

export type ErrorHandler = (error: Error, message: string) => void; 

const errorHandler = (error: Error, message: string) => { 
  console.log(error, message);
};

export const db: Db = {
  resultModule: results(errorHandler),
  endpointModule: endpoints(errorHandler),
  usersModule: users(errorHandler),
  authModule: auth(errorHandler),
};
