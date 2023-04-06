import { Column, Model } from "sequelize-typescript";

export class Base extends Model {
    @Column
    createdAt?: string;

    @Column
    updatedAt?: string;

    @Column
    createdBy: string;

    @Column
    updatedBy: string;
}