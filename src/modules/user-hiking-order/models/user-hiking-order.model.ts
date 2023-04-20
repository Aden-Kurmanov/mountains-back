import { Column, Model, Table } from "sequelize-typescript";
import { Hikings } from "../../hiking/models/hiking.model";
import { Users } from "../../users/models/users.model";

@Table
export class UserHikingOrder extends Model {
  @Column({
    allowNull: false,
    references: {
      model: Hikings,
      key: "id"
    }
  })
  hikingId: number;

  @Column({
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  })
  userId: number;
}
