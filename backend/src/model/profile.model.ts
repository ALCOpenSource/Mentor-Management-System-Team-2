import { Column } from "sequelize-typescript";
import { BaseModel } from "./base.model";

export class Profile extends BaseModel {
    @Column
    user_id!: number;

    @Column
    first_name!: string;

    @Column
    last_name!: string;

    @Column
    email!: string;

    @Column
    bio!: string;

}