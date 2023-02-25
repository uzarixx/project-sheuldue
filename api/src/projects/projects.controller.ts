import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { UserAuth } from "../guard/get-auth.decorator";
import { User } from "../users/users.model";
import { ValidationPipe } from "../pipes/validation.pipe";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectsService } from "./projects.service";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { DeleteProjectDto } from "./dto/delete-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { AddUserProjectDto } from "./dto/add-user-project.dto";

@Controller("projects")
export class ProjectsController {

  constructor(private projectService: ProjectsService) {
  }


  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post("/create-project")
  createProject(@Body() dto: CreateProjectDto, @UserAuth() user: User) {
    return this.projectService.createProject(user, dto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete("/delete-project")
  deleteProject(@Body() dto: DeleteProjectDto, @UserAuth() user: User) {
    return this.projectService.deleteProject(user, dto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put("/update-project")
  updateProject(@Body() dto: UpdateProjectDto, @UserAuth() user: User) {
    return this.projectService.updateProject(user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.projectService.getById(id)
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/add-user-project')
  addUserToProject(@Body() dto: AddUserProjectDto, @UserAuth() user: User) {
    return this.projectService.addUserToProject(dto, user)
  }
}
