import { Model } from 'sequelize';

export class ResultModel extends Model {
  public id: number;
  public endpoint_id: number;

  public readonly last_check: Date;
  public readonly http_status: string;
  public readonly payload: string;
 }
