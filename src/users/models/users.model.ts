import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Users extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    allowNull: false
  })
  password: string;

  @Column
  isDeleted: boolean;
}
