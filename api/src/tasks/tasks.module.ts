import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { ProjectsModule } from "../projects/projects.module";
import { UsersModule } from "../users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tasks } from "./tasks.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([Tasks]), ProjectsModule, UsersModule, JwtModule],
  exports: [TasksService]
})
export class TasksModule {
}
