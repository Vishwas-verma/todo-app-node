import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { cryptService } from "../services/factories/crypt.service";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "users"
})
export class User extends Model<User> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column(DataType.STRING)
  first_name: string;

  @AllowNull
  @Column(DataType.STRING)
  last_name?: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column({
    type: DataType.STRING,
    set : function (this: User, value: string) {
      this.setDataValue("password", cryptService.hashSync(value));
    }
  })
  password: string;

}
