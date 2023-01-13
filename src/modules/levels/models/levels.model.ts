import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Levels extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false
  })
  color: string;
}
