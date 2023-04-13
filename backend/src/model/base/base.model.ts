import { Model } from "sequelize";

export class BaseModel extends Model {  
  declare deletedAt: Date | null;
}