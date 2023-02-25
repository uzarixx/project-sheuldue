import {
  BelongsToMany,
  Column,
  DataType, ForeignKey, HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Tasks } from "../tasks/tasks.model";
import { ProjectUsers } from "./project-users.model";


interface UserCreationAttrs {
  title: string;
  description: string;
  deadline: string | number;
  userId: number;
}

@Table({ tableName: "projects" })
export class Projects extends Model<Projects, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @Column({ type: DataType.DATE, allowNull: false })
  deadline: string | number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @HasMany(() => Tasks)
  tasks: Tasks[];

  @BelongsToMany(() => User, () => ProjectUsers)
  users: User[];
}
