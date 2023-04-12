import { Table, Column, Model, BelongsTo, DataType, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { User } from './user.model';

@Table({ timestamps: true })
export class PasswordReset extends BaseModel {
    @ForeignKey(() => User)
    @Column(DataType.TEXT)
    email!: string;

  @Column(DataType.TEXT)
  passwordResetToken?: string;

  @Column(DataType.DATE)
  passwordResetExpires?: Date;

  @BelongsTo(() => User)
  user!: User;
}

export default PasswordReset;
