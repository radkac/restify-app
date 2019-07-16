import { Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin, Model,
} from 'sequelize';

import { ResultModel } from './resultModel';

export interface Endpoint {
  id: number;
  name?: string;
  url?: string;
  creation?: Date;
  last_check?: Date;
  interval?: number;
  user_id?: number;
}

export class EndpointModel extends Model {

  public static associations: {
    results: Association<EndpointModel, ResultModel>;
  };

  public id: number;
  public name: string;
  public url: string;
  public interval: number;
  public user_id: number;

  public readonly creation!: Date;
  public readonly last_check!: Date;

  public getResults!: HasManyGetAssociationsMixin<ResultModel>; // Note the null assertions!
  public addResult!: HasManyAddAssociationMixin<ResultModel, number>;
  public hasResult!: HasManyHasAssociationMixin<ResultModel, number>;
  public countResults!: HasManyCountAssociationsMixin;
  public createResult!: HasManyCreateAssociationMixin<ResultModel>;

  public readonly results?: ResultModel[]; // Note this is optional since it's only populated when explicitly requested in code

 }
