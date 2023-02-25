import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Projects } from "./projects.model";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { ProjectUsers } from "./project-users.model";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Projects, ProjectUsers]), JwtModule, UsersModule],
  exports: [ProjectsService]
})
export class ProjectsModule {
}
