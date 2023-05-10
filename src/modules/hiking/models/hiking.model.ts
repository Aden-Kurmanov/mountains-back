import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { DataTypes } from "sequelize";

import { Currencies } from "../../currencies/models/currencies.model";
import { HikeTypes } from "../../hike-types/models/hike-types.model";
import { Levels } from "../../levels/models/levels.model";
import { Companies } from "../../companies/models/companies.model";

@Table
export class Hikings extends Model {
  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false
  })
  description: string;

  @ForeignKey(() => Levels)
  @Column({
    allowNull: false
  })
  levelId: number;

  @BelongsTo(() => Levels)
  level: Levels;

  @ForeignKey(() => HikeTypes)
  @Column({
    allowNull: false
  })
  typeId: number;

  @BelongsTo(() => HikeTypes)
  type: HikeTypes;

  @ForeignKey(() => Companies)
  @Column({
    allowNull: false
  })
  guideId: number;

  @BelongsTo(() => Companies)
  guide: Companies;

  @Column({
    allowNull: false
  })
  startDate: string;

  @Column({
    allowNull: false
  })
  endDate: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false
  })
  images: string[];

  @Column({
    allowNull: false
  })
  price: number;

  @Column({
    allowNull: false
  })
  maxPeople: number;

  @ForeignKey(() => Currencies)
  @Column({
    allowNull: false
  })
  currencyId: number;

  @BelongsTo(() => Currencies)
  currency: Currencies;

  @Column
  deletedAt: string;
}
