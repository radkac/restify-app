import {
  Association, HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model,
} from 'sequelize';
import { EndpointModel } from './endpointModel';

export class UserModel extends Model {

  public static associations: {
    endpoints: Association<UserModel, EndpointModel>;
  };

  public id!: number;
  public email: string;
  public username: string;
  public access_token: string;

  public getEndpoints!: HasManyGetAssociationsMixin<EndpointModel>; // Note the null assertions!
  public addEndpoint!: HasManyAddAssociationMixin<EndpointModel, number>;
  public hasEndpoint!: HasManyHasAssociationMixin<EndpointModel, number>;
  public countEndpoints!: HasManyCountAssociationsMixin;
  public createEndpoint!: HasManyCreateAssociationMixin<EndpointModel>;

  public readonly endpoints?: EndpointModel[]; // Note this is optional since it's only populated when explicitly requested in code

}
