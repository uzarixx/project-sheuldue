import {
  BelongsToMany,
  Column,
  DataType, HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Projects } from "../projects/projects.model";
import { ProjectUsers } from "../projects/project-users.model";


interface UserCreationAttrs {
  email: string;
  password: string;
  username: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: false })
  username: boolean;
  @BelongsToMany(
    () => Role,
    () => UserRoles
  )
  roles: Role[];

  @BelongsToMany(() => Projects, () => ProjectUsers)
  projects: Projects[]
}
