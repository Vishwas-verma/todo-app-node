import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "todos"
})

export class Todo extends Model<Todo> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @AllowNull
  @Column(DataType.STRING)
  description?: string;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  created_by: number;

  @BelongsTo(() => User)
  creator: User;
}
