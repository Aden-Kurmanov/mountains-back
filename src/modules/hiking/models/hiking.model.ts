import { Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

import { Currencies } from "../../currencies/models/currencies.model";
import { Levels } from "../../levels/models/levels.model";
import { Users } from "../../users/models/users.model";

@Table
export class Hiking extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false
  })
  description: string;

  @Column({
    allowNull: false,
    references: {
      model: Levels,
      key: "id"
    }
  })
  levelId: number;

  @Column({
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    validate: {
      isArray: true
    }
  })
  typeIds: number[];

  @Column({
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  })
  guideId: number;

  @Column({
    allowNull: false
  })
  startDate: string;

  @Column({
    allowNull: false
  })
  endDate: string;

  @Column({
    allowNull: false
  })
  price: number;

  @Column({
    allowNull: false,
    references: {
      model: Currencies,
      key: "id"
    }
  })
  currencyId: number;
}
