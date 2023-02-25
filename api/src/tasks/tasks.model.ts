import {
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { Projects } from "../projects/projects.model";


interface UserCreationAttrs {
  title: string;
  description: string;
  deadline: string | number;
  projectId: number;
  status: boolean;
}

@Table({ tableName: "tasks" })
export class Tasks extends Model<Tasks, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  status: boolean;
  @Column({ type: DataType.DATE, allowNull: false })
  deadline: string | number;
  @ForeignKey(() => Projects)
  @Column({ type: DataType.INTEGER, allowNull: false })
  projectId: number;

}
