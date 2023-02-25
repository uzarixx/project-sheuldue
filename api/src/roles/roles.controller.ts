import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@Controller("roles")
export class RolesController {

  constructor(private roleService: RolesService) {
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

}
