import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ValidationPipe } from "../pipes/validation.pipe";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UserAuth } from "../guard/get-auth.decorator";
import { User } from "../users/users.model";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post("/create-task")
  createTask(@Body() dto: CreateTaskDto, @UserAuth() user: User) {
    return this.tasksService.createTask(user, dto);
  }
}
