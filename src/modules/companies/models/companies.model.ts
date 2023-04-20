import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Companies extends Model {
  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true
  })
  instagram: string;
}
