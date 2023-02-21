import { Table, Model, Column } from "sequelize-typescript";
import { Roles } from "../../roles/models/roles.model";
import { DataTypes } from "sequelize";

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
    references: {
      model: Roles,
      key: "id"
    }
  })
  roleId: number;

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

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
  isCompany: boolean;

  @Column({})
  companyName: string;

  @Column({})
  instagram: string;
}
