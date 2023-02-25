import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
import { UserAuth } from "../guard/get-auth.decorator";
import { User } from "./users.model";

@Controller("users")
export class UsersController {

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getMe(@UserAuth() user: User) {
    return user;
  }
}
