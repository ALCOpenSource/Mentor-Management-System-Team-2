import { connect } from "../config/db.config";
import { BaseModel } from "./base.model";
import { DataTypes } from "sequelize";

//@Table({ timestamps: true, tableName:"Users", modelName:"U"})
export class User extends BaseModel {
 // @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  declare user_id: number;

  //@Column(DataType.TEXT)
  declare first_name: string;

  //@Column(DataType.TEXT)
  declare last_name: string;

  //@Column(DataType.TEXT)
  declare email: string;

  //@Column(DataType.TEXT)
  declare bio: string;

  //@Column(DataType.TEXT)
  declare profile_picture: string;

 // @Column(DataType.STRING)
 declare password: string;

  //@Column(DataType.STRING)
  declare phone_number: string;

  //@Column(DataType.TEXT)
  declare country_code: string;

  //@Column(DataType.TEXT)
  declare address: string;

  //@Column(DataType.TEXT)
  declare state: string;

  //@Column(DataType.TEXT)
  declare website: string;

}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  }}, { tableName: "Users", sequelize: connect.sequelize },)


export default User;
