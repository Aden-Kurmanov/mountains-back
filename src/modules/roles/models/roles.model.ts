import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Roles extends Model {
  @Column({
    unique: true,
    allowNull: false
  })
  name: string;

  @Column({
    unique: true,
    allowNull: false
  })
  code: string;
}
