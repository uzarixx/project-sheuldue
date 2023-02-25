import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tasks } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ProjectsService } from "../projects/projects.service";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks, private projectService: ProjectsService, private userService: UsersService) {
  }

  async createTask(user: User, dto: CreateTaskDto) {
    await this.projectService.getUserInProject(user.id, dto.projectId);
    const task = await this.taskRepository.create(dto);
    return task;
  }

}
