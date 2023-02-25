import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Projects } from "./projects.model";

@Table({
  tableName: "project_users",
  timestamps: false
})
export class ProjectUsers extends Model<ProjectUsers> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.INTEGER, allowNull: false })
  projectId: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId: number;
}
