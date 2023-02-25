import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { Projects } from "./projects/projects.model";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { Tasks } from "./tasks/tasks.model";
import { JwtModule } from "@nestjs/jwt";
import { ProjectUsers } from "./projects/project-users.model";


@Module({
  controllers: [TasksController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.development.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(
        process.env.POSTGRES_PORT
      ),
      username:
      process.env.POSTGRES_USER,
      password:
      process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Projects, ProjectUsers, Tasks],
      autoLoadModels: true,
      logging: false
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    JwtModule
  ]
})
export class AppModule {
}

