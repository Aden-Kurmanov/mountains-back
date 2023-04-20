import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Users extends Model {
  @Column({
    allowNull: false
  })
  firstName: string;

  @Column({
    allowNull: false
  })
  lastName: string;

  @Column({})
  patronymic: string;

  @Column({})
  country: string;

  @Column({
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email: string;

  @Column({
    allowNull: false,
    unique: true
  })
  phone: string;

  @Column({
    allowNull: false
  })
  password: string;

  @Column({})
  instagram: string;
}
