import { Column, Model, Table } from "sequelize-typescript";

@Table
export class HikeTypes extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true
  })
  code: string;
}
