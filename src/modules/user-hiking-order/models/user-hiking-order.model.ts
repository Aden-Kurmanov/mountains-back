import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { Hikings } from "../../hiking/models/hiking.model";
import { Users } from "../../users/models/users.model";

@Table({ tableName: "UserHikingOrder" })
export class UserHikingOrder extends Model {
  @ForeignKey(() => Hikings)
  @Column({
    allowNull: false
  })
  hikingId: number;

  @BelongsTo(() => Hikings)
  hiking: Hikings;

  @ForeignKey(() => Users)
  @Column({
    allowNull: false
  })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;
}
