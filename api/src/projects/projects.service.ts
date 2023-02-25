import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Projects } from "./projects.model";
import { User } from "../users/users.model";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UsersService } from "../users/users.service";
import { DeleteProjectDto } from "./dto/delete-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectUsers } from "./project-users.model";
import { AddUserProjectDto } from "./dto/add-user-project.dto";

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Projects) private projectsRepository: typeof Projects, @InjectModel(ProjectUsers) private projectUsers: typeof ProjectUsers, private userService: UsersService) {
  }

  async createProject(user: User, dto: CreateProjectDto) {
    const candidate = await this.userService.getUserByEmail(user.email);
    if (!candidate) {
      throw new UnauthorizedException("User is not find");
    }
    const project = await this.projectsRepository.create({ ...dto, userId: user.id });
    await this.projectUsers.create({ projectId: project.id, userId: user.id });
    return project;
  }

  async deleteProject(user: User, dto: DeleteProjectDto) {
    const project = await this.projectsRepository.findOne({ where: { id: dto.projectId } });
    if (project.userId !== user.id) {
      throw new HttpException("User with this email already exists", HttpStatus.FORBIDDEN);
    }
    await this.projectsRepository.destroy({ where: { id: dto.projectId } });
    return "success";
  }

  async updateProject(user: User, dto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({ where: { id: dto.projectId } });
    if (project.userId !== user.id) {
      throw new HttpException("User with this email already exists", HttpStatus.FORBIDDEN);
    }
    project.title = dto.title;
    project.description = dto.description;
    project.deadline = dto.deadline;
    await project.save();
    return "success";
  }
  async getById(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: ["id", "email", "username"] }]
    });
    return project;
  }

  async addUserToProject(dto: AddUserProjectDto, user: User) {
    const project = await this.projectsRepository.findOne({ where: { id: dto.projectId } });
    if (!project || project.userId !== user.id) {
      throw new HttpException("Project is not a found, or you not a creator", HttpStatus.FORBIDDEN);
    }
    const projectInclude = await this.projectUsers.findOne({where: {userId: user.id, projectId: dto.projectId}})
    if (projectInclude) {
      throw new HttpException("User added in this project", HttpStatus.FORBIDDEN);
    }
    const projectUsers = await this.projectUsers.create({ userId: user.id, projectId: dto.projectId });
    return projectUsers;
  }

  async getUserInProject(userId: number, projectId: number) {
    const projectInclude = await this.projectUsers.findOne({where: {userId, projectId}})
    if (!projectInclude || projectInclude.userId !== userId) {
      throw new HttpException("User don't added to this project, or project is not a found", HttpStatus.FORBIDDEN);
    }
    return true
  }
}
