import { Table, Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ timestamps: true })
export class User extends BaseModel {
  @Column(DataType.TEXT)
  first_name!: string;

  @Column(DataType.TEXT)
  last_name!: string;

  @Column(DataType.TEXT)
  email!: string;

  @Column(DataType.TEXT)
  bio!: string;

  @Column(DataType.TEXT)
  profile_picture!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  phone_number!: string;

  @Column(DataType.TEXT)
  country_code!: string;

  @Column(DataType.TEXT)
  address!: string;

  @Column(DataType.TEXT)
  state!: string;

  @Column(DataType.TEXT)
  website!: string;

}

export default User;
