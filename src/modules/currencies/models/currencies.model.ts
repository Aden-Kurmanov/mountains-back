import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Currencies extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false
  })
  code: string;
}
